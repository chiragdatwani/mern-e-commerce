import React, { useEffect, useRef } from 'react'
import { Paper, Table, TableBody, TableCell, TableRow, Select, MenuItem } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Image,StyledLink,StyledTable } from './CartItems.elements'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { TweenMax, Power3 } from 'gsap';

const CartItems = ({items}) => {

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    let rowRef = useRef([]);
    useEffect(() => {
        TweenMax.from(rowRef.current, 2, {opacity: 0, y: 20, stagger: .2, ease: Power3.easeOut})
    }, [])

    return (
        // <TableContainer component={Paper}>
            <StyledTable component={Paper}>
                <Table>
                <TableBody>
                {
                    items.map((item, index)=>(
                    <TableRow ref={el => rowRef.current[index] = el} key={item.product}>
                        <TableCell align="left">
                            <Image src={item.image} alt={item.name}/>
                        </TableCell>
                        <TableCell align="left">
                            {<StyledLink to={`/product/${item.product}`}>{<h3>{item.name}</h3>}</StyledLink>}
                        </TableCell>
                        <TableCell align="left">
                            <p>
                                {`$${item.price}`}
                            </p>
                        </TableCell>
                        <TableCell align="left">{
                            <Select
                            value={item.qty}
                            onChange={e => dispatch(
                                addToCart(item.product, Number(e.target.value))
                            )}
                            displayEmpty
                            inputProps={{ 
                                name: 'quantity',
                                id: item.name,
                            }} >
                                <MenuItem value="" disabled>Quantity</MenuItem>
                                {[...Array(item.countInStock).keys()].map(x => (
                                    <MenuItem key={x+1} value={x+1}>{x + 1}</MenuItem>
                                ))}
                            </Select>
                        }</TableCell>
                        <TableCell align="left">{<DeleteIcon onClick={() => deleteHandler(item.product)}/>}</TableCell>
                     </TableRow>
                     ))
                }
                </TableBody>
                </Table>
            </StyledTable>
    )
}

export default CartItems

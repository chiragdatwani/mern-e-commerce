import React from 'react'
import { Paper, Table, TableBody, TableCell, TableRow, Select, MenuItem } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Image,StyledLink,StyledTable } from './CartItems.elements'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';

const CartItems = ({items}) => {

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        // <TableContainer component={Paper}>
            <StyledTable component={Paper}>
                <Table>
                <TableBody>
                {
                     items.map((item)=>(
                    <TableRow key={item.product}>
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
                                id: 'qty'
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

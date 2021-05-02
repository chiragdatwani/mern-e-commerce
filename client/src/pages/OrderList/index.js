import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../../components/Loader/Loader';
import ClearIcon from '@material-ui/icons/Clear';
import { StyledTableRow } from './OrderList.elements';
import { getOrders } from '../../actions/orderActions';


const OrderList = ({history}) => {

    const currentUser = useSelector( state => state.currentUser);
    const { userInfo } = currentUser;

    const orderList = useSelector( state => state.orderList);
    const { orders, loading, error } = orderList;


    const dispatch = useDispatch();

    useEffect(() => {

        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        
        dispatch(getOrders())
    }, [dispatch, history, userInfo])

    return (
        <div className='orderlist_page'>
            {
            loading ? <Loader /> : error ? <Alert severity='error'>{error}</Alert> : (
                <>
                <h1>Orders</h1>
                <TableContainer component={Paper}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                                    <TableCell align='right'><strong>USER</strong></TableCell>
                                    <TableCell align='right'><strong>DATE</strong></TableCell>
                                    <TableCell align='right'><strong>TOTAL</strong></TableCell>
                                    <TableCell align='right'><strong>PAID</strong></TableCell>
                                    <TableCell align='right'><strong>DELIVERED</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map( order => (
                                    <StyledTableRow 
                                        key={order._id}
                                        onClick={()=> {history.push(`/order/${order._id}`)}}
                                    >
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell align='right'>{order.user.name}</TableCell>
                                        <TableCell align='right'>{order.createdAt.slice(0,10)}</TableCell>
                                        <TableCell align='right'>${order.totalPrice}</TableCell>
                                        <TableCell align='right'>{order.isPaid ? order.paidAt.slice(0,10) : <ClearIcon style={{color:'red'}}/>}</TableCell>
                                        <TableCell align='right'>{ order.isDelivered ? order.deliveredAt.slice(0,10) : <ClearIcon style={{color:'red'}}/>}</TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                </>
            )
            }
        </div>
    )
}

export default OrderList;

import React, { useEffect } from 'react';
import {Card, CardContent, Container, Divider, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions/orderActions';
import Loader from '../../components/Loader/Loader';
import { Message, OrderItem, ShippingMessage, SummaryItem } from './Order.elements';

const Order = ({match}) => {

    const orderId = match.params.id;

    const orderDetails = useSelector( state => state.orderDetails); 
    const { order, loading, error } = orderDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getOrderDetails(orderId))
        
        // eslint-disable-next-line
    }, [])

    return (
        <div className='placerorder-page'>
            { loading ? <Loader /> : 
            error ? <Alert severity='error'>{error}</Alert> :
            <>
            <h2>{`ORDER NO. ${order._id}`}</h2>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <h3>SHIPPING</h3>
                    <p>
                        <strong>Name: </strong>
                        {`${order.user.name}`
                        }
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {`${order.user.email}`
                        }
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`
                        }
                    </p>
                    <Message>
                    {order.isDelivered ? 
                        <Alert severity='success'>Delivered on {order.deliveredAt}</Alert> :
                        <Alert
                        severity='error'>
                            Not Delivered Yet
                        </Alert>
                    }
                    </Message>
                    <Divider />
                    <h3>PAYMENT</h3>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    <Message>
                    {order.isPaid ? 
                        <Alert severity='success'>Paid on {order.paidAt}</Alert> :
                        <Alert
                        severity='error'>
                            Not Paid
                        </Alert>
                    }
                    </Message>
                    <Divider />
                    <h3>Order Items</h3>
                    {
                        order.orderItems.length === 0 ? <Alert>No Items to Display</Alert> :
                        
                            order.orderItems.map( item => (
                                <>
                                <OrderItem>
                                    <img style= {{width: '50px'}} src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>{`${item.qty} x ${item.price} = ${item.qty*item.price}`}</p>
                                </OrderItem>
                                <Divider />
                                </>
                                ))
                    }
                </Grid>
                <Grid item xs={12} md={4}>
                    <Container>
                    <Card>
                        <CardContent>
                        <h3>ORDER SUMMARY</h3>
                        <Divider/>
                        <SummaryItem>Items:  <strong>${order.orderItems.reduce( (acc,item) => acc + item.price * item.qty , 0).toFixed(2)}</strong>
                        </SummaryItem>
                        <SummaryItem>Shipping:  <strong>${order.shippingPrice}</strong></SummaryItem>
                        <SummaryItem>Total:  <strong>${order.totalPrice}</strong></SummaryItem>
                        <ShippingMessage>(Orders above $100 have free shipping)</ShippingMessage>
                        </CardContent>
                    </Card>
                    </Container>
                </Grid>
            </Grid>
            </>
            
            }
            
        </div>
    )
}

export default Order;
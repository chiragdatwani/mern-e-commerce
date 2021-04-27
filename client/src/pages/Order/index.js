import React, { useEffect, useState } from 'react';
import {Card, CardActionArea, CardContent, CircularProgress, Container, Divider, Grid } from '@material-ui/core';
import { PayPalButton } from 'react-paypal-button-v2';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../../actions/orderActions';
import Loader from '../../components/Loader/Loader';
import { Message, OrderItem, ShippingMessage, SummaryItem } from './Order.elements';
import axios from 'axios';
import types from '../../actions/types';

const Order = ({match}) => {

    const orderId = match.params.id;

    const [ sdkReady, setSdkReady ] = useState(false);

    const orderDetails = useSelector( state => state.orderDetails); 
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector( state => state.orderPay); 
    const { success:successPay, loading:loadingPay} = orderPay;

    const dispatch = useDispatch();

    useEffect(() => {

        const addPayPalScript = async () => {
            const {data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onLoad = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }

        if(!order || successPay){
            dispatch({ type: types.ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else {
                setSdkReady(true)
            }
        }
         

    }, [order, orderId, successPay, dispatch])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult))
    }
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
                        <CardActionArea>
                            {!order.isPaid && (
                            <div>
                                {loadingPay && <CircularProgress/>}
                                {!sdkReady ? <CircularProgress/> : (
                                    <PayPalButton amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}/>
                                )}
                                </div>
                            )}
                        </CardActionArea>
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
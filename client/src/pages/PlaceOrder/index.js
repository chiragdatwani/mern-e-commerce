import { Button, Card, CardContent, Container, Divider, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderActions';
import StepperNav from '../../components/StepperNav'
import { OrderItem, ShippingMessage, SummaryItem } from './PlaceOrder.elements';

const PlaceOrder = ({history}) => {

    const cart = useSelector( state => state.cart );

    cart.itemsPrice = cart.cartItems.reduce( (acc,item) => acc + item.price * item.qty , 0).toFixed(2)

    cart.shippingPrice = cart.itemsPrice > 50 ? 0.00 : 10.00

    cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, error } = orderCreate;

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div className='placerorder-page'>
            <Container maxWidth={'lg'}>
            <StepperNav stepNumber={3} />
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <h3>SHIPPING</h3>
                    <p>
                        <strong>Address: </strong>
                        {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode} ${cart.shippingAddress.country}`
                        }
                    </p>
                    <Divider />
                    <h3>PAYMENT</h3>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                    <Divider />
                    <h3>Order Items</h3>
                    {
                        cart.cartItems.length === 0 ? <Alert>Your Cart is Empty</Alert> :
                        
                            cart.cartItems.map( item => (
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
                        <SummaryItem>Items:  <strong>${cart.itemsPrice}</strong></SummaryItem>
                        <SummaryItem>Shipping:  <strong>${cart.shippingPrice}</strong></SummaryItem>
                        <SummaryItem>Total:  <strong>${cart.totalPrice}</strong></SummaryItem>
                        <ShippingMessage>(Orders above $50 have free shipping)</ShippingMessage>
                        {error ? <Alert severity='error'>{error}</Alert>: <></>}
                        <Divider />
                        <Button style={{marginTop: '12px'}} variant='contained' color='primary' onClick={handleSubmit}>PLACE ORDER</Button>
                        </CardContent>
                    </Card>
                    </Container>
                </Grid>
            </Grid>
            </Container>
        </div>
    )
}

export default PlaceOrder;

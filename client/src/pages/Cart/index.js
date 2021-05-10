import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { Button, Card, CardContent, Container, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import CartItems from '../../components/CartItems'


const CartPage = ({match, location, history}) => {

    const productId = match.params.id;
    
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems)

    const checkoutHandler = () => {
        console.log('checkout');
        history.push('/login?redirect=shipping')
    }

    useEffect(() => {
        document.title = 'My Cart';
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    
    return (
        <div className='cart-page'>
            <Container maxWidth={'lg'}>
                <h2 style={{marginTop : '35px'}}>SHOPPING CART</h2>
                <Grid container spacing={3} justify='center'>
                    <Grid item xs = {12} sm={8}>
                    {cartItems.length === 0 ? (
                    <Alert severity="warning">{'Shopping cart is empty'}</Alert>) :(
                    <CartItems items={cartItems} />
                        
                    )} 
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card>
                            <CardContent>
                                <h3>Total Items : {cartItems.reduce((acc,item) => (acc + item.qty), 0)}</h3>
                                <h3>Total Amount : ${cartItems.reduce((acc,item) => (acc + item.qty * item.price), 0).toFixed(2)}</h3>
                                <hr/>
        
                                <Button onClick={checkoutHandler} color='primary' variant={cartItems.length === 0? 'disabled':'contained'}>Proceed To Checkout</Button>
                                
                            </CardContent>
                            
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default CartPage

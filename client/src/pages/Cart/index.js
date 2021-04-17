import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { addToCart } from '../../actions/cartActions';


const CartPage = ({match, location, history}) => {

    const productId = match.params.id;
    

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems)

    console.log(cartItems);
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    
    return (
        <div>
            Cart
        </div>
    )
}

export default CartPage

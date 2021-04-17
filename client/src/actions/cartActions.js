import axios from 'axios';

import types from './types';

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price:data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
import types from './types';
import axios from 'axios';

export const fetchProducts = () => async(dispatch) => {
    try {
        dispatch({type: types.FETCH_PRODUCTS_REQUEST})

        const {data} = await axios.get('/api/products');
        dispatch({
            type: types.FETCH_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.FETCH_PRODUCTS_FAIL,
            payload: error.message
        })
    }
};
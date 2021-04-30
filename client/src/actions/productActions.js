import types from './types';
import axios from 'axios';

export const fetchProductsList = () => async(dispatch) => {
    try {
        dispatch({type: types.FETCH_PRODUCTSLIST_REQUEST})

        const {data} = await axios.get('/api/products');
        
        dispatch({
            type: types.FETCH_PRODUCTSLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.FETCH_PRODUCTSLIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};


export const fetchProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type:types.FETCH_PRODUCT_REQUEST })

        const {data} = await axios.get(`/api/products/${id}`);

        dispatch({
            type: types.FETCH_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.FETCH_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProductAdmin = (id) => async(dispatch, getState) => {

    try {
        dispatch({ type: types.PRODUCT_DELETE_REQUEST });

        const {currentUser: {userInfo}} = getState();

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config);

        dispatch({ type: types.PRODUCT_DELETE_SUCCESS });

    } catch (error) {
        dispatch({
            type: types.PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

export const createProductAdmin = () => async(dispatch, getState) => {

    try {
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });

        const {currentUser: {userInfo}} = getState();

        const config ={
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products`,{}, config);

        dispatch({ 
            type: types.PRODUCT_CREATE_SUCCESS,
            payload: data   
        });

    } catch (error) {
        dispatch({
            type: types.PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};
import axios from 'axios';
import types from './types';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: types.ORDER_CREATE_REQUEST});

        const { currentUser: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post('/api/orders', order, config)

        dispatch({
            type: types.ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: types.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_DETAILS_REQUEST })

        const { currentUser: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST })

        const { currentUser: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

        dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getMyOrders = () => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_LIST_REQUEST })

        const { currentUser: { userInfo }} = getState();

        const config = {  
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: types.ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getOrders = () => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDERS_LIST_ADMIN_REQUEST })

        const { currentUser: { userInfo }} = getState();

        const config = {  
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: types.ORDERS_LIST_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.ORDERS_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deliverOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_DELIVER_REQUEST })

        const { currentUser: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }  

        const { data } = await axios.put(`/api/orders/${id}/deliver`,{},  config)

        dispatch({
            type: types.ORDER_DELIVER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: types.ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
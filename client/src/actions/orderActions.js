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
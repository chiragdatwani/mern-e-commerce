import axios from "axios";
import types from "./types"

export const login = (email, password) => async (dispatch) =>{
    try{
        dispatch({
            type: types.USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json '
            }
        }

        const {data} = await axios.post('/api/users/login', {email, password}, config);

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

};

export const logout = ()=> (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: types.USER_LOGOUT });
    dispatch({type: types.ORDER_LIST_RESET})
}

export const registerUser = (name, email, password) => async (dispatch) =>{
    try{
        dispatch({
            type: types.USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json '
            }
        }

        const {data} = await axios.post('/api/users', {name, email, password}, config);

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })  
    }

};

export const getUserDetails = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: types.USER_DETAILS_REQUEST
        });

        const { currentUser: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: types.USER_DETAILS_SUCCESS,
            payload: data
        });

        
    } catch(error) {
        dispatch({
            type: types.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })  
    }

};

export const updateUserProfile = (user) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: types.USER_UPDATE_PROFILE_REQUEST
        });

        const { currentUser: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data))

        
    } catch(error) {
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })  
    }

};

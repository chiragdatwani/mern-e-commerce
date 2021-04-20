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

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers'


const reducer = combineReducers({
    productList : productListReducer,
    currentProduct: productDetailsReducer,
    cart: cartReducer,
    currentUser: userLoginReducer

});

const cartItemsLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('cartItems')) : null;

const initialState= {
    cart: {cartItems: cartItemsLocalStorage},
    currentUser: {userInfo: userInfoLocalStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
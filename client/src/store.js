import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer,  productCreateReviewReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, orderListReducer, orderListAdminReducer } from './reducers/orderReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer } from './reducers/userReducers';


const reducer = combineReducers({
    productList : productListReducer,
    currentProduct: productDetailsReducer,
    cart: cartReducer,
    currentUser: userLoginReducer,
    registeredUser: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userProfileUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    myOrders: orderListReducer,
    orderList: orderListAdminReducer,
    userList: userListReducer,
    deleteUser: userDeleteReducer,
    deleteProduct: productDeleteReducer,
    createProduct: productCreateReducer,
    updateProduct: productUpdateReducer,
    productReviewCreate: productCreateReviewReducer
});

const cartItemsLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const initialState= {
    cart: {cartItems: cartItemsLocalStorage, shippingAddress: shippingAddressLocalStorage,},
    currentUser: {userInfo: userInfoLocalStorage},
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
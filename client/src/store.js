import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers'


const reducer = combineReducers({
    productList : productListReducer,
    currentProduct: productDetailsReducer,
    cart: cartReducer
});

const cartItemsLocalStorage = localStorage.getItem('cartItems') ?   JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState= {
    cart: {cartItems: cartItemsLocalStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
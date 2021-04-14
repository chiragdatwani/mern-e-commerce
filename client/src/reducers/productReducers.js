import types from '../actions/types'

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTSLIST_REQUEST:
            return {products: [], loading: true}
        case types.FETCH_PRODUCTSLIST_SUCCESS:
            return {products: action.payload, loading: false}
        case types.FETCH_PRODUCTSLIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};

export const productDetailsReducer = (state = {product: { reviews: []}}, action) => {

    switch (action.type) {
        case types.FETCH_PRODUCT_REQUEST:
            return {loading: true, ...state}
        case types.FETCH_PRODUCT_SUCCESS:
            return {loading: false, product: action.payload}
        case types.FETCH_PRODUCT_FAIL:
            return {loading: false, error: action.payload}
    
        default:
            return state
    }
};
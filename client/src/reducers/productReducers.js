import types from '../actions/types'

export const productListReducer = (state = {products: [], loading: true}, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS_REQUEST:
            return {products: [], loading: true}
        case types.FETCH_PRODUCTS_SUCCESS:
            return {products: action.payload, loading: false}
        case types.FETCH_PRODUCTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
import types from '../actions/types'

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTSLIST_REQUEST:
            return {products: [], loading: true}
        case types.FETCH_PRODUCTSLIST_SUCCESS:
            return {products: action.payload.products, page: action.payload.page, totalPages: action.payload.totalPages, loading: false}
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

export const productDeleteReducer = (state = {}, action) => {

    switch (action.type) {
        case types.PRODUCT_DELETE_REQUEST:
            return {loading: true}
        case types.PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case types.PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
    
        default:
            return state
    }
};

export const productCreateReducer = (state = {}, action) => {

    switch (action.type) {
        case types.PRODUCT_CREATE_REQUEST:
            return {loading: true}
        case types.PRODUCT_CREATE_SUCCESS:
            return {loading: false, product: action.payload, success:true}
        case types.PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case types.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
};

export const productUpdateReducer = (state = {product:{}}, action) => {

    switch (action.type) {
        case types.PRODUCT_UPDATE_REQUEST:
            return {loading: true}
        case types.PRODUCT_UPDATE_SUCCESS:
            return {loading: false, product: action.payload, success:true}
        case types.PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case types.PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state
    }
};

export const productCreateReviewReducer = (state = {}, action) => {

    switch (action.type) {
        case types.PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case types.PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success:true}
        case types.PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        case types.PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
};
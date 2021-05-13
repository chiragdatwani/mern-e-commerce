import types from "../actions/types";

export const orderCreateReducer = (state = {}, action) => {

    switch (action.type) {
        case types.ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case types.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case types.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {

    switch (action.type) {
        case types.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case types.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {

    switch (action.type) {
        case types.ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case types.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case types.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
};


export const orderListReducer = (state = {orders:[]}, action) => {

    switch (action.type) {
        case types.ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case types.ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case types.ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.ORDER_LIST_RESET:
            return { orders: []}
        default:
            return state;
    }
};

export const orderListAdminReducer = (state={orders: []}, action) => {

    switch (action.type) {
        case types.ORDERS_LIST_ADMIN_REQUEST:
            return { loading: true }
        case types.ORDERS_LIST_ADMIN_SUCCESS:
            return { loading: false, orders: action.payload }
        case types.ORDERS_LIST_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case types.ORDERS_LIST_ADMIN_RESET:
            return { orders: [] }
        default:
            return state
    }
};

export const orderDeliverReducer = (state = {}, action) => {

    switch (action.type) {
        case types.ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }
        case types.ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case types.ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case types.ORDER_DELIVER_RESET:
            return {}
        default:
            return state;
    }
};
import types from '../actions/types'

export const userLoginReducer = (state = {}, action) => {

    switch (action.type) {
        case types.USER_LOGIN_REQUEST:
            return { loading: true}
        case types.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload}
        case types.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload}
        case types.USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {

    switch (action.type) {
        case types.USER_REGISTER_REQUEST:
            return { loading: true}
        case types.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload}
        case types.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload}
        case types.USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userDetailsReducer = (state = {user:{}}, action) => {

    switch (action.type) {
        case types.USER_DETAILS_REQUEST:
            return { ...state, loading: true}
        case types.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload}
        case types.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        case types.USER_LOGOUT:
            return {}
        default:
            return state
    }
};

export const userProfileUpdateReducer = (state = {}, action) => {

    switch (action.type) {
        case types.USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true}
        case types.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true,userInfo: action.payload}
        case types.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload}
        case types.USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = {users: []}, action) => {

    switch (action.type) {
        case types.USER_LIST_REQUEST:
            return { ...state, loading: true}
        case types.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case types.USER_LIST_FAIL:
            return { loading: false, error: action.payload}
        case types.USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}
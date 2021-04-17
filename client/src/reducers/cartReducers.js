import types from '../actions/types';

const cartReducer = (state = {cartItems: []}, action) => {

    switch (action.type) {
        case types.CART_ADD_ITEM:
            const item = action.payload;
            const exists = state.cartItems.find(x => x.product === item.product);
            if(exists){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === exists.product ? item : x)
                }
            }else{
                return  {...state,cartItems:[...state.cartItems, action.payload]}
            }
    
        default:
            return state    }

}
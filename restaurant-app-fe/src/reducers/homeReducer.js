import { 
    LOAD_DATA_FROM_LOCALSTORAGE, 
    LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAILED, 
    ITEMS_REQUEST, 
    ITEMS_SUCCESS, 
    ITEMS_FAILED,
    CART_ITEM_ADD,
    CART_ITEM_REMOVE,
    CART_ITEM_CLEAR,
    CART_CHECKOUT_REQUEST,
    CART_CHECKOUT_SUCCESS,
    CART_CHECKOUT_FAILED,
    LOAD_CART_FROM_LOCALSTORAGE
} from '../actions/home'

const initialState = {
    IsAuthenticated: false,
    Username: '',
    Message: '',
    Data: [],
    Cart: [],
    NumItemsInCart: 0
}

export default function homeReducer(state = initialState, action){
    switch(action.type){
        case LOAD_DATA_FROM_LOCALSTORAGE:
            return Object.assign({}, state, {    
                Username: action.payload.Username,
                IsAuthenticated: action.payload.IsAuthenticated
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                Username: action.payload
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                IsAuthenticated: false,
                Message: action.payload
            });
        case LOGOUT_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case ITEMS_REQUEST:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case ITEMS_SUCCESS:
            return Object.assign({}, state, {
                Data: action.payload
            });
        case ITEMS_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case CART_ITEM_ADD:
            return Object.assign({}, state, {
                Cart: state.Cart.concat(action.payload)}
            );
        case CART_ITEM_REMOVE:
            return Object.assign({}, state, {
                Cart: state.Cart.filter(item => item.ItemID !== action.payload)}
            );
        case CART_ITEM_CLEAR:
            return Object.assign({}, state, {
                Cart: []
            });               
        case CART_CHECKOUT_REQUEST:
            return Object.assign({}, state, {
            });
        case CART_CHECKOUT_SUCCESS:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case CART_CHECKOUT_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case LOAD_CART_FROM_LOCALSTORAGE:
            return Object.assign({}, state, {
                Cart: action.payload
            });
        default:
            return state;
    }
}
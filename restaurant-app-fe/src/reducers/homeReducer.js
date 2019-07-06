import { LOAD_DATA_FROM_LOCALSTORAGE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../actions/home'

const initialState = {
    IsAuthenticated: false,
    Username: '',
    Message: ''
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
        default:
            return state;
    }
}
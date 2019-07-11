import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from '../actions/register'

const initialState = {
    Username: '',
    Message: ''
}

export default function registerReducer(state = initialState, action){
    switch(action.type){
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                Username: action.payload
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case REGISTER_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        default:
            return state;
    }
}
import { LOAD_DATA_FROM_LOCALSTORAGE } from '../actions/home'

const initialState = {
    IsAuthenticated: false,
    Username: '',
    Message: ''
}

export default function homeReducer(state = initialState, action){
    switch(action.type){
        case LOAD_DATA_FROM_LOCALSTORAGE:
            console.log('Username: ' + action.payload.Username)
            console.log('IsAuthenticated: ' + action.payload.IsAuthenticated)
            return Object.assign({}, state, {    
                Username: action.payload.Username,
                IsAuthenticated: action.payload.IsAuthenticated
            });
        default:
            return state;
    }
}
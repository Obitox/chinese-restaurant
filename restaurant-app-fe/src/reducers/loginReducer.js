import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/login'

const initialState = {
    IsAuthenticated: false,
    // IsLoading: false,
    Username: '',
    Message: ''
}

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                Username: action.payload
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                IsAuthenticated: true,
                Message: action.payload
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                Message: action.payload
            });
        default:
            return state;
        // case Actions.CSRF_REQUEST:
        //     return [
        //         ...state,
        //         action.payload
        //     ]
        // case Actions.CSRF_SUCCESS:
        //     return [
        //         ...state,
        //         action.payload
        //     ]
        // case Actions.CSRF_FAILURE:
        //     return [
        //         ...state,
        //         action.payload
        //     ]
    }
}
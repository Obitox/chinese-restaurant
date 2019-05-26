import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/login'

const initialState = {
    user: {
        
    }
}

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_REQUEST:
            return [
                ...state,
                action.payload
            ];
        case LOGIN_SUCCESS:
            return [
                ...state,
                action.payload
            ]
        case LOGIN_FAILURE:
            return [
                ...state,
                action.payload
            ]
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
        default:
            return state;
    }
}
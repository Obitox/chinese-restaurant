import { 
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILED
} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Message: '',
    Users: [],
    User: {},
    IsFetching: true,
    Username: ''
}

export default function usersReducer(state = initialState, action){
    switch(action.type){
        case USERS_REQUEST:
            return Object.assign({}, state, {
                IsFetching: action.payload
            });
        case USERS_SUCCESS:
            return Object.assign({}, state, {
                Users: action.payload.Users,
                IsFetching: action.payload.isFetching
            });
        case USERS_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case USER_UPDATE_REQUEST:
            return Object.assign({}, state, {
                User: action.payload
            });
        case USER_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                Messsage: action.payload
            });
        case USER_UPDATE_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case USER_DELETE_REQUEST:
            return Object.assign({}, state, {
                Username: action.payload
            });
        case USER_DELETE_SUCCESS:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case USER_DELETE_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        default:
            return state;
    }
}
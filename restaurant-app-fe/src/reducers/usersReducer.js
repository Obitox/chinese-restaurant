import { 
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILED,
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_ADD_FAILED
} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Message: '',
    Users: [],
    User: {},
    IsFetching: true,
    UserID: 0
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
                UserID: action.payload
            });
        case USER_DELETE_SUCCESS:
            return Object.assign({}, state, {
                // Users: state.Users.filter((user) => {
                //         return user.UserID !== state.UserID
                // }),
                Message: action.payload.Message
            });
        case USER_DELETE_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case USER_ADD_REQUEST:
            return Object.assign({}, state, {
                User: action.payload
            });
        case USER_ADD_SUCCESS:
            return Object.assign({}, state, {
                // Users: state.Cart.concat(state.User),
                Message: action.payload.Message
            });
        case USER_DELETE_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        default:
            return state;
    }
}
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
    USER_ADD_FAILED,
    CLOSE_USER_SNACKBAR,
    LOAD_USER_TABLE_COLUMNS

} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Message: '',
    Users: [],
    User: {},
    IsFetchingUsers: true,
    IsSuccessful: false,
    Open: false,
    Columns: [],
    UserID: 0
}

export default function usersReducer(state = initialState, action){
    switch(action.type){
        case USERS_REQUEST:
            return Object.assign({}, state, {
                IsFetchingUsers: action.payload
            });
        case USERS_SUCCESS:
            return Object.assign({}, state, {
                Users: action.payload.Users,
                IsFetchingUsers: action.payload.IsFetchingUsers
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
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Messsage: action.payload.Message,
                Users: action.payload.Users
            });
        case USER_UPDATE_FAILED:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Messsage: action.payload.Message
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
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message,
                Users: action.payload.Users
            });
        case USER_DELETE_FAILED:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message,
            });
        case USER_ADD_REQUEST:
            return Object.assign({}, state, {
                User: action.payload
            });
        case USER_ADD_SUCCESS:
            return Object.assign({}, state, {
                // Users: state.Cart.concat(state.User),
                Message: action.payload.Message,
                Users: action.payload.Users
            });
        case USER_DELETE_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case CLOSE_USER_SNACKBAR:
            return Object.assign({}, state, {
                Open: action.payload.Open
            });
        case LOAD_USER_TABLE_COLUMNS:
            return Object.assign({}, state, {
                Columns: action.payload.Columns
            });
        default:
            return state;
    }
}
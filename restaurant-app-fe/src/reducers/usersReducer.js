import { 
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILED
} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Message: '',
    Users: [],
    IsFetching: true
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
        default:
            return state;
    }
}
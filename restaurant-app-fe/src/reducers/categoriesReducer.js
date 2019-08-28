import { 
    CATEGORIES_REQUEST,
    CATEGORIES_SUCCESS,
    CATEGORIES_FAILED
} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Categories: [],
    Message: '',
    IsFetchingCategories: true,
}

export default function categoriesReducer(state = initialState, action){
    switch(action.type){
        case CATEGORIES_REQUEST:
            return Object.assign({}, state, {
                IsFetchingCategories: action.payload
            });
        case CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                Categories: action.payload.Categories,
                IsFetchingCategories: action.payload.IsFetching
            });
        case CATEGORIES_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        default:
            return state;
    }
}
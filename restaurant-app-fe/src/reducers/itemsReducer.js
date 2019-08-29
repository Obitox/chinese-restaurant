import { 
    ITEMS_REQUEST,
    ITEMS_SUCCESS,
    ITEMS_FAILED,
    OPEN_ITEM
} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Items: [],
    Message: '',
    IsFetchingItems: true,
    ItemID: 0,
    IsSuccessful: false
}

export default function itemsReducer(state = initialState, action){
    switch(action.type){
        case ITEMS_REQUEST:
            return Object.assign({}, state, {
                IsFetchingItems: action.payload
            });
        case ITEMS_SUCCESS:
            return Object.assign({}, state, {
                Items: action.payload.Items,
                IsFetchingItems: action.payload.IsFetching
            });
        case ITEMS_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        case OPEN_ITEM:
            return Object.assign({}, state, {
                ItemID: action.payload
            });
        default:
            return state;
    }
}
import { 
    ITEMS_REQUEST,
    ITEMS_SUCCESS,
    ITEMS_FAILED,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILED,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILED,
    CLOSE_SNACKBAR,
    LOAD_TABLE_COLUMNS,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILED

} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Items: [],
    Item: {},
    IsSuccessful: false,
    Open: false,
    Message: '',
    IsFetchingItems: true,
    ItemID: 0,
    Columns: []
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
        // case OPEN_ITEM:
        //     return Object.assign({}, state, {
        //         Item: action.payload.Item,
        //         Open: action.payload.Open
        //     });
        // case CLOSE_ITEM:
        //     return Object.assign({}, state, {
        //         Item: action.payload.Item,
        //         Open: action.payload.Open
        //     });
        case ADD_ITEM_REQUEST:
            return Object.assign({}, state, {
                Item: action.payload
            });
        case ADD_ITEM_SUCCESS:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message,
                Items: state.Items.concat(action.payload.Item)
            });
        case ADD_ITEM_FAILED:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message,
                Item: {}
            });
        case CLOSE_SNACKBAR:
            return Object.assign({}, state, {
                Open: action.payload.Open
            });
        case LOAD_TABLE_COLUMNS:
            return Object.assign({}, state, {
                Columns: action.payload
            });
        case UPDATE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message,
                Items: action.payload.Items
            });
        case UPDATE_ITEM_FAILED:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message
            });
        case DELETE_ITEM_REQUEST:
            return Object.assign({}, state, {
                ItemID: action.payload
            });
        case DELETE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message,
                Items: action.payload.Items
            });
        case DELETE_ITEM_FAILED:
            return Object.assign({}, state, {
                Open: action.payload.Open,
                IsSuccessful: action.payload.IsSuccessful,
                Message: action.payload.Message
            });
        default:
            return state;
    }
}
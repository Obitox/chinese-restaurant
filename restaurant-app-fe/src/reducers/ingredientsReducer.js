import { 
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_FAILED
} from '../actions/adminDashboard'

const initialState = {
    // Username: '',
    Message: '',
    Ingredients: [],
    Ingredient: {},
    IsFetchingIngredients: true,
}

export default function ingredientsReducer(state = initialState, action){
    switch(action.type){
        case INGREDIENTS_REQUEST:
            return Object.assign({}, state, {
                IsFetchingIngredients: action.payload
            });
        case INGREDIENTS_SUCCESS:
            return Object.assign({}, state, {
                Ingredients: action.payload.Ingredients,
                IsFetchingIngredients: action.payload.IsFetchingIngredients
            });
        case INGREDIENTS_FAILED:
            return Object.assign({}, state, {
                Message: action.payload
            });
        default:
            return state;
    }
}
import Actions from '../actions/login'

const initialState = {
    user_id: '',
    username: ''
}

function login(state = initialState, action){
    switch(action.type){
        case Actions.LOGIN_REQUEST:
            return [
                ...state,
                action.payload
            ];
        case Actions.LOGIN_SUCCESS:
            return [
                ...state,
                action.payload
            ]
        case Actions.LOGIN_FAILURE:
            return [
                ...state,
                action.payload
            ]
        default:
            return state;
    }
}
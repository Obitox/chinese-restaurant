import { combineReducers } from 'redux'

import homeReducer from './homeReducer' 
import loginReducer from './loginReducer'

const restaurant_app = combineReducers({
    homeReducer,
    loginReducer
})

export default restaurant_app
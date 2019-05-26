import { combineReducers } from 'redux'
import loginReducer  from './loginReducer'

const restaurant_app = combineReducers({
   loginReducer: loginReducer
    //  Reducer2,
    //  ...
})

export default restaurant_app
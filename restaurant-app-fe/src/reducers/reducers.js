import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import homeReducer from './homeReducer' 
import loginReducer from './loginReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    homeReducer,
    loginReducer
})

// const restaurant_app = combineReducers({
    
// })

// export default restaurant_app
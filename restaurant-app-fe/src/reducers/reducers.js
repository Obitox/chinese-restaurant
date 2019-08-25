import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import homeReducer from './homeReducer' 
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import usersReducer from './usersReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    homeReducer,
    loginReducer,
    registerReducer,
    usersReducer
})

// const restaurant_app = combineReducers({
    
// })

// export default restaurant_app
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import homeReducer from './homeReducer' 
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import usersReducer from './usersReducer'
import itemsReducer from './itemsReducer'
import categoriesReducer from './categoriesReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    homeReducer,
    loginReducer,
    registerReducer,
    usersReducer,
    itemsReducer,
    categoriesReducer
})

// const restaurant_app = combineReducers({
    
// })

// export default restaurant_app
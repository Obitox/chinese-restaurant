import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import homeReducer from './homeReducer' 
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import usersReducer from './usersReducer'
import itemsReducer from './itemsReducer'
import categoriesReducer from './categoriesReducer'
import ingredientsReducer from './ingredientsReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    homeReducer,
    loginReducer,
    registerReducer,
    usersReducer,
    itemsReducer,
    ingredientsReducer,
    categoriesReducer
})

// const restaurant_app = combineReducers({
    
// })

// export default restaurant_app
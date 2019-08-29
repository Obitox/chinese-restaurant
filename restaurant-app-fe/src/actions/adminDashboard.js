export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILED = 'USERS_FAILED'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED'

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAILED = 'USER_DELETE_FAILED'

export const USER_ADD_REQUEST = 'USER_ADD_REQUEST'
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS'
export const USER_ADD_FAILED = 'USER_ADD_FAILED'

export const ITEMS_REQUEST = 'ITEMS_REQUEST'
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'
export const ITEMS_FAILED = 'ITEMS_FAILED'

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS'
export const CATEGORIES_FAILED = 'CATEGORIES_FAILED'

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST'
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS'
export const INGREDIENTS_FAILED = 'INGREDIENTS_FAILED'

export const OPEN_ITEM = 'OPEN_ITEM'

const baseURL = `http://localhost:3000`

const usersRequest = (isFetching) => {
    return {
        type: USERS_REQUEST,
        payload: isFetching
    }
}

const usersSuccess = (users, isFetching) => {
    return {
        type: USERS_SUCCESS, 
        payload: {
            Users: users,
            isFetching: isFetching
        }
    }
}

const usersFailed = (message) => {
    return {
        type: USERS_FAILED, 
        payload: message
    }
}

const addUserRequest = (user) => {
    return {
        type: USER_ADD_REQUEST,
        payload: user
    }
}

const addUserSuccess = (message) => {
    return {
        type: USER_ADD_SUCCESS,
        payload: {
            Message: message
        }
    }
}

const addUserFailed = (message) => {
    return {
        type: USER_ADD_FAILED,
        payload: message
    }
}

const updateUserRequest = (user) => {
    return {
        type: USER_UPDATE_REQUEST,
        payload: user
    }
}

const updateUserSuccess = (message) => {
    return {
        type: USER_UPDATE_SUCCESS,
        payload: message
    }
}

const updateUserFailed = (message) => {
    return {
        type: USER_UPDATE_FAILED,
        payload: message
    }
}

const deleteUserRequest = (userID) => {
    return {
        type: USER_UPDATE_REQUEST,
        payload: userID
    }
}

const deleteUserSuccess = (message) => {
    return {
        type: USER_UPDATE_SUCCESS,
        payload: {
            Message: message
        }
    }
}

const deleteUserFailed = (message) => {
    return {
        type: USER_UPDATE_FAILED,
        payload: message
    }
}

const itemsRequest = (isFetching) => {
    return {
        type: ITEMS_REQUEST,
        payload: isFetching
    }
}

const itemsSuccess = (items, isFetching) => {
    return {
        type: ITEMS_SUCCESS,
        payload: {
            Items: items,
            IsFetching: isFetching
        }
    }
}

const itemsFailed = (message) => {
    return {
        type: ITEMS_SUCCESS,
        payload: message
    }
}


const categoriesRequest = (isFetching) => {
    return {
        type: CATEGORIES_REQUEST,
        payload: isFetching
    }
}

const categoriesSuccess = (categories, isFetching) => {
    return {
        type: CATEGORIES_SUCCESS,
        payload: {
            Categories: categories,
            IsFetching: isFetching
        }
    }
}

const categoriesFailed = (message) => {
    return {
        type: CATEGORIES_SUCCESS,
        payload: message
    }
}

const ingredientsRequest = (isFetching) => {
    return {
        type: INGREDIENTS_REQUEST,
        payload: isFetching
    }
}

const ingredientsSuccess = (ingredients, isFetching) => {
    return {
        type: INGREDIENTS_SUCCESS,
        payload: {
            Ingredients: ingredients,
            IsFetching: isFetching
        }
    }
}

const ingredientsFailed = (message) => {
    return {
        type: INGREDIENTS_SUCCESS,
        payload: message
    }
}

export const fetchUsers = (csrf) => dispatch => {
    // FIXME: Remove this hardcoded value
    let isFetching = true;
    dispatch(usersRequest(isFetching))

    console.log("CSRF: " + csrf);

    const payload = {
        _RequestAntiForgeryToken: csrf
    }

    // const response = await fetch(baseURL + '/users', {
    //     method: 'POST',
    //  //    mode: 'cors',
    //  //    headers: {
    //  //        'Content-Type': 'application/json',
    //  //        // 'Content-Type': 'application/x-www-form-urlencoded',
    //  //     },
    //      body: JSON.stringify(payload),
    //      credentials: 'include'
    //  });
    // const json = await response.json();
    // dispatch(usersSuccess(json))

    



    fetch(baseURL + '/users', {
       method: 'POST',
    //    mode: 'cors',
    //    headers: {
    //        'Content-Type': 'application/json',
    //        // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
        body: JSON.stringify(payload),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if(response.length > 0){
            let isFetching = false;
            dispatch(usersSuccess(response, isFetching))
        } else {
            dispatch(usersFailed("Authentication failed, username or password is wrong"))
        }
    })
    .catch(error => dispatch(usersFailed(error)));
}

export const updateUser = (user, csrf) => dispatch => {
    dispatch(updateUserRequest(user))

    user.RequestAntiForgeryToken = csrf;
    console.log(user.RequestAntiForgeryToken);

    fetch(baseURL + '/updateUser', {
        method: 'POST',
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
         body: JSON.stringify(user),
         credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         if(response.Message == "OK"){
             dispatch(updateUserSuccess(response.Message))
         } else {
             dispatch(updateUserFailed("Update failed"))
         }
     })
     .catch(error => dispatch(updateUserFailed(error)));
}

export const deleteUser = (user, csrf) => dispatch => {
    dispatch(deleteUserRequest(user.UserID))

    user.RequestAntiForgeryToken = csrf;
    console.log(user);
    
    fetch(baseURL + '/deleteUser', {
        method: 'POST',
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
         body: JSON.stringify(user),
         credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         if(response.Message == "OK"){
             dispatch(deleteUserSuccess(response.Message))
         } else {
             dispatch(deleteUserFailed("Delete failed"))
         }
     })
     .catch(error => dispatch(deleteUserFailed(error)));
}

export const addUser = (user, csrf) => dispatch => {
    dispatch(addUserRequest(user))

    user.RequestAntiForgeryToken = csrf;
    console.log(user);
    
    fetch(baseURL + '/addUser', {
        method: 'POST',
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
         body: JSON.stringify(user),
         credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         if(response.Message == "OK"){
             dispatch(addUserSuccess(response.Message))
         } else {
             dispatch(addUserFailed("Add failed"))
         }
     })
     .catch(error => dispatch(deleteUserFailed(error)));
}

export const fetchItems = () => dispatch => {
    let isFetching = true;
    dispatch(itemsRequest(isFetching))

    fetch(baseURL + '/home', {
        method: 'POST'
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
        //  body: JSON.stringify(payload),
        //  credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         if(response.length > 0){
             isFetching = false;
            dispatch(itemsSuccess(response, isFetching))
         } else {
             dispatch(itemsFailed("No data"))
         }
     })
     .catch(error => dispatch(itemsFailed(error)));
}

export const fetchCategories = () => dispatch => {
    let isFetching = true;
    dispatch(categoriesRequest(isFetching))

    fetch(baseURL + '/categories', {
        method: 'POST'
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
        //  body: JSON.stringify(payload),
        //  credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         if(response.length > 0){
            isFetching = false;
            dispatch(categoriesSuccess(response, isFetching))
         } else {
             dispatch(categoriesFailed("No data"))
         }
     })
     .catch(error => dispatch(categoriesFailed(error)));
}

export const fetchIngredients = () => dispatch => {
    let isFetching = true;
    dispatch(ingredientsRequest(isFetching))

    fetch(baseURL + '/ingredients', {
        method: 'POST'
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
        //  body: JSON.stringify(payload),
        //  credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         if(response.length > 0){
            isFetching = false;
            dispatch(ingredientsSuccess(response, isFetching))
         } else {
             dispatch(ingredientsFailed("No data"))
         }
     })
     .catch(error => dispatch(ingredientsFailed(error)));
}

export const openItem = (itemID) => dispatch => {
    dispatch(
        {
            type: OPEN_ITEM,
            payload: itemID
        }
    )
}
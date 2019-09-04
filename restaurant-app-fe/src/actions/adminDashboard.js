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
export const CLOSE_ITEM = 'CLOSE_ITEM'

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_FAILED = 'ADD_ITEM_FAILED'

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const CLOSE_USER_SNACKBAR = 'CLOSE_USER_SNACKBAR'

export const LOAD_TABLE_COLUMNS = 'LOAD_TABLE_COLUMNS'
export const LOAD_USER_TABLE_COLUMNS = 'LOAD_USER_TABLE_COLUMNS'

// export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST'
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS'
export const UPDATE_ITEM_FAILED = 'UPDATE_ITEM_FAILED'

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILED = 'DELETE_ITEM_FAILED'

const baseURL = `http://localhost:3000`

// const updateItemRequest = () => {
//     return {
//         type: UPDATE_ITEM_REQUEST,
//         payload: 
//     }
// }

const closeUserSnackbar = () => {
    return {
        type: CLOSE_USER_SNACKBAR,
        payload: {
            Open: false
        }
    }
}

const loadUserColumns = (columns) => {
    return {
        type: LOAD_USER_TABLE_COLUMNS,
        payload: {
            Columns: columns
        }
    }
}

const deleteItemRequest = (itemID) => {
    return {
        type: DELETE_ITEM_REQUEST,
        payload: itemID
    }
}

const deleteItemSuccess = (items, message) => {
    return {
        type: DELETE_ITEM_SUCCESS,
        payload: {
            Open: true,
            IsSuccessful: true,
            Message: message,
            Items: items
        }
    }
}

const deleteItemFailed = (message) => {
    return {
        type: DELETE_ITEM_FAILED,
        payload: {
            Open: true,
            IsSuccessful: false,
            Message: message
        }
    }
}

const updateItemSuccess = (items, message) => {
    return {
        type: UPDATE_ITEM_SUCCESS,
        payload: {
            Open: true,
            IsSuccessful: true,
            Message: message,
            Items: items
        }
    }
}

const updateItemFailed = (message) => {
    return {
        type: UPDATE_ITEM_FAILED,
        payload: {
            Open: true,
            IsSuccessful: false,
            Message: message
        }
    }
}


const loadColumns = (columns) => {
    return {
        type: LOAD_TABLE_COLUMNS,
        payload: columns
    }
}

const openItem = (item) => {
    return {
        type: OPEN_ITEM,
        payload: {
            Item: item,
            Open: true
        }
    }
}

const closeItem = () => {
    return {
        type: CLOSE_ITEM,
        payload: {
            Item: {},
            Open: false
        }
    }
}

export const openItemDialog = (item) => dispatch => {
    dispatch(openItem(item));
}

export const closeItemDialog = () => dispatch => {
    dispatch(closeItem());
}

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

const addUserSuccess = (users, message) => {
    return {
        type: USER_ADD_SUCCESS,
        payload: {
            Message: message,
            Users: users
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

const updateUserSuccess = (users, message) => {
    return {
        type: USER_UPDATE_SUCCESS,
        payload: {
            Open: true,
            IsSuccessful: true,
            Message: message,
            Users: users
        }
    }
}

const updateUserFailed = (message) => {
    return {
        type: USER_UPDATE_FAILED,
        payload: {
            Open: true,
            IsSuccessful: false,
            Message: message,
        }
    }
}

const deleteUserRequest = (userID) => {
    return {
        type: USER_DELETE_REQUEST,
        payload: userID
    }
}

const deleteUserSuccess = (users, message) => {
    return {
        type: USER_DELETE_SUCCESS,
        payload: {
            Open: true,
            IsSuccessful: true,
            Message: message,
            Users: users,
        }
    }
}

const deleteUserFailed = (message) => {
    return {
        type: USER_DELETE_FAILED,
        payload: {
            Open: true,
            IsSuccessful: false,
            Message: message
        }
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

const addItemRequest = (item) => {
    return {
        type: ADD_ITEM_REQUEST,
        payload: item
    }
}

const addItemSuccess = (item, message) => {
    return {
        type: ADD_ITEM_SUCCESS,
        payload: {
            Open: true,
            IsSuccessful: true,
            Message: message,
            Item: item
        }
    }
}

const addItemFailed = (message) => {
    return {
        type: ADD_ITEM_FAILED,
        payload: {
            Open: true,
            IsSuccessful: false,
            Message: message
        }
    }
}

const closeSnackbar = () => {
    return {
        type: CLOSE_SNACKBAR,
        payload: {
            Open: false
        }
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

export const updateUser = (users, user, csrf) => dispatch => {
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
             dispatch(updateUserSuccess(users, response.Message))
         } else {
             dispatch(updateUserFailed("Update failed"))
         }
     })
     .catch(error => dispatch(updateUserFailed(error)));
}

export const deleteUser = (users, user, csrf) => dispatch => {
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
             dispatch(deleteUserSuccess(users, response.Message))
         } else {
             dispatch(deleteUserFailed("Delete failed"))
         }
     })
     .catch(error => dispatch(deleteUserFailed(error)));
}

export const addUser = (users, user, csrf) => dispatch => {
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
             dispatch(addUserSuccess(users, response.Message))
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

export const addItem = (item) => dispatch => {
    dispatch(addItemRequest(item));

    fetch(baseURL + '/addItem', {
        method: 'POST',
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
         body: JSON.stringify(item),
         credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         let message = "";
         console.log(response);
         if(response.Message == "OK"){
            message = "Item successfully added";
            dispatch(addItemSuccess(item, message))
         } else {
             message = "Item add failed";
             dispatch(addItemFailed(message))
         }
     })
     .catch(error => dispatch(addItemFailed(error)));
}

export const handleClose = () => dispatch => {
    dispatch(closeSnackbar())
}

export const loadTableColumns = (columns) => dispatch => {
    dispatch(loadColumns(columns));
}

export const loadUserTableColumns = (columns) => dispatch => {
    dispatch(loadUserColumns(columns))
}

export const updateItem = (items, item, csrf) => dispatch => {
    item.RequestAntiForgeryToken = csrf;

    fetch(baseURL + '/updateItem', {
        method: 'POST',
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
         body: JSON.stringify(item),
         credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         let message = "";
         console.log(response);
         if(response.Message == "OK"){
            message = "Item successfully updated";
            dispatch(updateItemSuccess(items, message))
         } else {
             message = "Item update failed";
             dispatch(updateItemFailed(message))
         }
     })
     .catch(error => dispatch(updateItemFailed(error)));
}

export const deleteItem = (items, item, csrf) => dispatch => {
    dispatch(deleteItemRequest(item.ItemID));

    item.RequestAntiForgeryToken = csrf;

    fetch(baseURL + '/deleteItem', {
        method: 'POST',
     //    mode: 'cors',
     //    headers: {
     //        'Content-Type': 'application/json',
     //        // 'Content-Type': 'application/x-www-form-urlencoded',
     //     },
         body: JSON.stringify(item),
         credentials: 'include'
     })
     .then(res => res.json())
     .then(response => {
         let message = "";
         console.log(response);
         if(response.Message == "OK"){
            message = "Item successfully deleted";
            dispatch(deleteItemSuccess(items, message))
         } else {
             message = "Item delete failed";
             dispatch(deleteItemFailed(message))
         }
     })
     .catch(error => dispatch(deleteItemFailed(error)));
}

export const handleUserSnackbarClose = () => dispatch => {
    dispatch(closeUserSnackbar())
}
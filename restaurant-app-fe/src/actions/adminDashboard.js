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
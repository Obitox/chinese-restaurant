export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILED = 'USERS_FAILED'


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
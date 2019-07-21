export const LOAD_DATA_FROM_LOCALSTORAGE = 'LOAD_DATA_FROM_LOCALSTORAGE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const ITEMS_REQUEST = 'ITEMS_REQUEST'
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'
export const ITEMS_FAILED = 'ITEMS_FAILED'

const baseURL = `http://localhost:3000`

const logoutRequest = (username) => {
    return {
        type: LOGOUT_REQUEST, 
        payload: username
    }
}

const logoutSuccess = (message) => {
    return {
        type: LOGOUT_SUCCESS,
        payload: message
    }
}

const logoutFailed = (message) => {
    return {
        type: LOGOUT_FAILED,
        payload: message
    }
}

const loadData = (userInfo) => {
    return {
        type: LOAD_DATA_FROM_LOCALSTORAGE,
        payload: userInfo
    }
}

const itemsRequest = () => {
    return {
        type: ITEMS_REQUEST,
        payload: 'Request'
    }
}

const itemsSuccess = (items) => {
    return {
        type: ITEMS_SUCCESS,
        payload: items
    }
}

const itemsFailed = (message) => {
    return {
        type: ITEMS_SUCCESS,
        payload: message
    }
}

export const tryLoadDataFromLocalStroage = () => dispatch => {

    if(localStorage.hasOwnProperty("Username") && localStorage.hasOwnProperty("IsAuthenticated"))
    {
        // Targeted load
        const userInfo = {
            Username: localStorage.getItem("Username"),
            IsAuthenticated: localStorage.getItem("IsAuthenticated") === 'true' ? true : false
        }

        dispatch(loadData(userInfo))
    }
    // Automatated load
    // var i = 0,
    //     oJson = {},
    //     sKey;
    // for (; sKey = window.localStorage.key(i); i++) {
    //     oJson[sKey] = window.localStorage.getItem(sKey);
    // }
}

export const logoutAction = (csrf) => dispatch => {
    if(localStorage.hasOwnProperty("Username") && localStorage.hasOwnProperty("IsAuthenticated"))
    {
        // Targeted load
        const userInfo = {
            Username: localStorage.getItem("Username"),
            IsAuthenticated: localStorage.getItem("IsAuthenticated")
        }

        const payload = {
            RequestAntiForgeryToken: csrf
        }

        dispatch(logoutRequest(userInfo.Username))

        fetch(baseURL + '/logout', {
            method: 'POST',
            body: JSON.stringify(payload),
            credentials: 'include'
         })
         .then(res => res.json())
         .then(response => {
             if(response.Message == "OK"){
                localStorage.setItem("IsAuthenticated", false)
                dispatch(logoutSuccess(response.Message))
             } else {
                 dispatch(logoutFailed("Logout failed"))
             }
         })
         .catch(error => {
            dispatch(logoutFailed(error))
         });
    }
}

export const fetchItems = () => dispatch => {
    dispatch(itemsRequest())

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
            console.log(response)
            dispatch(itemsSuccess(response))
         } else {
             dispatch(itemsFailed("No data"))
         }
     })
     .catch(error => dispatch(itemsFailed(error)));
}
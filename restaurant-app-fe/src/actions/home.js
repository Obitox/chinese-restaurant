export const LOAD_DATA_FROM_LOCALSTORAGE = 'LOAD_DATA_FROM_LOCALSTORAGE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

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
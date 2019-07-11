import { push } from 'connected-react-router'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

const baseURL = `http://localhost:3000`

const registerRequest = (username) => {
    return {
        type: REGISTER_REQUEST,
        payload: username
    }
}

const registerSuccess = (message) => {
    return {
        type: REGISTER_SUCCESS,
        payload: message
    }
}

const registerFailed = (message) => {
    return {
        type: REGISTER_FAILED,
        payload: message
    }
}

export const registerAction = (user) => dispatch => {    
    dispatch(registerRequest(user.username));

    fetch(baseURL + '/register', {
       method: 'POST',
    //    mode: 'cors',
    //    headers: {
    //        'Content-Type': 'application/json',
    //        // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(response => {
        if(response.Message == "OK"){
            dispatch(registerSuccess(response.Message))
            dispatch(push('/login'))
        } else {
            dispatch(registerFailed("Registration failed"))
        }
    })
    .catch(error => dispatch(registerFailed(error)));
}
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// export const Actions = {
//     // LOGIN
//     LOGIN_REQUEST: 'LOGIN_REQUEST',
//     LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//     LOGIN_FAILURE: 'LOGIN_FAILURE',
//     // CSRF
//     // CSRF_REQUEST: 'CSRF_REQUEST',
//     // CSRF_SUCCESS: 'CSRF_SUCCESS',
//     // CSRF_FAILURE: 'CSRF_FAILURE',
// }

const baseURL = `http://localhost:3000`

// const loginRequest = (username, password) => ({
//     type: Actions.LOGIN_REQUEST,
//     payload: 
// });

const loginRequest = (username) => {
    return {
        type: LOGIN_REQUEST,
        payload: username
    }
}

const loginSuccess = (message) => {
    return {
        type: LOGIN_SUCCESS, 
        payload: message
    }
}

const loginFailure = (message) => {
    return {
        type: LOGIN_FAILURE, 
        payload: message
    }
}

export const loginAction = (username, password) => dispatch => {
    dispatch(loginRequest(username))

    const payload = {
        username: username,
        password: password
    }
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    fetch(baseURL + '/login', {
       method: 'POST',
       body: JSON.stringify(payload) 
    })
    .then(res => res.json())
    .then(response => {
        console.log('JOJOJO')
        if(response.Message == "OK"){
            console.log('USPESAN')
            dispatch(loginSuccess(response.Message)) 
        } else {
            dispatch(loginFailure("Authentication failed, username or password is wrong"))
        }
    }
    )
    .catch(error =>
        {
            console.log('FALL')
            console.log(error)
            dispatch(loginFailure(error))
        }
    );
}

// const csrf = () => dispatch() => {
//     dispatch()
// }
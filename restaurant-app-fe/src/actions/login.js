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

export const loginAction = (username, password) => dispatch => {
    dispatch({type: LOGIN_REQUEST, payload: username})

    const payload = {
        username: username,
        password: password
    }

    fetch(baseURL + '/login', {
       method: 'POST',
       body: JSON.stringify(payload) 
    })
    .then(res => res.json())
    .then(response => {
        if(response.data.Message == "OK"){
            dispatch({type: LOGIN_SUCCESS, payload: response.data.Message}) 
        } else {
            dispatch({type: LOGIN_FAILURE, payload: "Authentication failed, username or password is wrong"})
        }
    }
    )
    .catch(error =>
        dispatch({type: LOGIN_FAILURE, payload: error})
    );
}

// const csrf = () => dispatch() => {
//     dispatch()
// }
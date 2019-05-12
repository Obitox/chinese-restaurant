// export const LOGIN_REQUEST = 'LOGIN_REQUEST'
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const Actions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE'
}

const baseURL = `http://localhost:3000`

// const loginRequest = (username, password) => ({
//     type: Actions.LOGIN_REQUEST,
//     payload: 
// });

const login = (username, password) => dispatch => {
    dispatch({type: Actions.LOGIN_REQUEST, payload: username})

    const payload = {
        username: username,
        password: password
    }

    fetch(baseURL + '/login', {
       method: 'POST',
       body: JSON.stringify(payload) 
    })
    .then(res => res.json())
    .then(response => 
        dispatch({type: Actions.LOGIN_SUCCESS, payload: response.data})
    )
    .catch(error =>
        dispatch({type: Actions.LOGIN_FAILURE, payload: error})
    );
}
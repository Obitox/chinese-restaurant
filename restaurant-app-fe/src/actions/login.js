export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const baseURL = `http://localhost:3000`

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

const saveSingleValueToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const saveObjectToLocalStorage = (userInfo) => {
    console.log('happened')
    console.log('Username: ' + userInfo.Username)
    console.log(userInfo)

    for (var key in userInfo) {
        console.log('Ajajajaj')
        if (userInfo.hasOwnProperty(key)) {
            console.log('HAAAAAAAAA')
            localStorage.setItem(key, userInfo[key]);
        } else{
        console.log('ELSE')}
    }

    console.log('Username: ' + localStorage.getItem('Username'))
    console.log('IsAuthenticated: ' + localStorage.getItem('IsAuthenticated'))
}

export const loginAction = (username, password, csrf) => dispatch => {
    dispatch(loginRequest(username))

    const payload = {
        username: username,
        password: password,
        _RequestAntiForgeryToken: csrf
    }

    fetch(baseURL + '/login', {
       method: 'POST',
       body: JSON.stringify(payload),
       credentials: 'include'
    })
    .then(res => res.json())
    .then(response => {
        if(response.Message == "OK"){
            saveObjectToLocalStorage({
                Username: username,
                IsAuthenticated: true
            })
            dispatch(loginSuccess(response.Message)) 
        } else {
            dispatch(loginFailure("Authentication failed, username or password is wrong"))
        }
    })
    .catch(error => dispatch(loginFailure(error)));
}
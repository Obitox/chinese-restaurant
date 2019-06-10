export const LOAD_DATA_FROM_LOCALSTORAGE = 'LOAD_DATA_FROM_LOCALSTORAGE'

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
            IsAuthenticated: localStorage.getItem("IsAuthenticated")
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
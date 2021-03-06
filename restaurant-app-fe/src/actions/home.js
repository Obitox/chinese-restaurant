export const LOAD_DATA_FROM_LOCALSTORAGE = 'LOAD_DATA_FROM_LOCALSTORAGE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const ITEMS_REQUEST = 'ITEMS_REQUEST'
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'
export const ITEMS_FAILED = 'ITEMS_FAILED'

export const LOAD_CART_FROM_LOCALSTORAGE = 'LOAD_CART_FROM_LOCALSTORAGE'

export const CART_CHECKOUT_REQUEST = 'CART_CHECKOUT_REQUEST'
export const CART_CHECKOUT_SUCCESS = 'CART_CHECKOUT_SUCCESS'
export const CART_CHECKOUT_FAILED = 'CART_CHECKOUT_FAILED'

export const CART_ITEM_ADD = 'CART_ITEM_ADD'
export const CART_ITEM_CLEAR = 'CART_ITEM_CLEAR'
export const CART_ITEM_REMOVE = 'CART_ITEM_REMOVE'

export const INCREMENT_CART_ITEM_AMOUNT = 'INCREASE_CART_ITEM_AMOUNT'
export const DECREMENT_CART_ITEM_AMOUNT = 'DECREMENT_CART_ITEM_AMOUNT'

export const CLOSE_CART_TOAST = 'CLOSE_CART_TOAST';

const baseURL = `http://localhost:3000`

const closeCartToast = () => {
    return {
        type: CLOSE_CART_TOAST,
        payload: {
            Open: false
        }
    }
}

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

const cartCheckoutRequest = () => {
    return {
        type: CART_CHECKOUT_REQUEST
    }
}

const cartCheckoutSuccess = (message) => {
    return {
        type: CART_CHECKOUT_SUCCESS,
        payload: {
            Message: message,
            Open: true,
            IsSuccessful: true,
        }
    }
}

const cartCheckoutFailed = (message) => {
    return {
        type: CART_CHECKOUT_FAILED,
        payload: {
            Message: message,
            Open: true,
            IsSuccessful: false,
        }
    }
}

const cartItemAdd = (item) => {
    return {
        type: CART_ITEM_ADD,
        payload: item
    }
}

const cartItemRemove = (itemID, size) => {
    return {
        type: CART_ITEM_REMOVE,
        payload: {ItemID: itemID, Size: size}
    }
}

const cartItemClear = () => {
    return {
        type: CART_ITEM_CLEAR,
        payload: "Cleared"
    }
}

const cartItemIncrementAmount = (itemID, newTotalPrice, size) => {
    return {
        type: INCREMENT_CART_ITEM_AMOUNT,
        payload: {
            ItemID: itemID,
            TotalPrice: newTotalPrice,
            Size: size
        }
    }
}

const cartItemDecrementAmount = (itemID, newTotalPrice, size) => {
    return {
        type: DECREMENT_CART_ITEM_AMOUNT,
        payload: {
            ItemID: itemID,
            TotalPrice: newTotalPrice,
            Size: size
        }
    }
}

const loadCart = (cart) => {
    return {
        type: LOAD_CART_FROM_LOCALSTORAGE,
        payload: cart
    }
}

export const loadCartFromLocalStorage = () => dispatch => {
    if(localStorage.hasOwnProperty("cart")){
        let cart = JSON.parse(localStorage.getItem("cart"));
        dispatch(loadCart(cart))
    }
}

export const tryLoadDataFromLocalStorage = () => dispatch => {

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
                if(localStorage.hasOwnProperty("IsAdmin")){
                    localStorage.setItem("IsAdmin", false)
                }
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
            dispatch(itemsSuccess(response))
         } else {
             dispatch(itemsFailed("No data"))
         }
     })
     .catch(error => dispatch(itemsFailed(error)));
}


// TODO: Check if item already exists then just append amount
export const addItemToCart = (item) => dispatch => {
    dispatch(cartItemAdd(item))
}

export const removeItemFromCart = (itemID, size) => dispatch => {
    if(localStorage.hasOwnProperty("cart")){
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = [];

        if(cart.length > 0) {
            for(var i = 0; i < cart.length; i++){
                if(cart[i].ItemID !== itemID){
                    newCart.push(cart[i]);
                }
            }
        }

        if(newCart.length > 0){
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
        else {
            localStorage.removeItem("cart");
        }
    }
    
    dispatch(cartItemRemove(itemID, size))
}

export const clearCartItems = () => dispatch => {
    dispatch(cartItemClear())
}

export const incrementCartItemAmount = (itemID, newTotalPrice, size) => dispatch => {
    dispatch(cartItemIncrementAmount(itemID, newTotalPrice, size))
}

export const decrementCartItemAmount = (itemID, newTotalPrice, size) => dispatch => {
    dispatch(cartItemDecrementAmount(itemID, newTotalPrice, size))
}

export const checkoutCart = (cart, csrf) => dispatch => {
    dispatch(cartCheckoutRequest())
    const payload = {
        Items: cart,
        RequestAntiForgeryToken: csrf
    }

    fetch(baseURL + '/checkoutCart', {
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
         if(response.Message == "OK"){
            localStorage.removeItem("cart")
            dispatch(cartCheckoutSuccess("Order successful, our dispatcher will contact you shortly."))
         } else {
             dispatch(cartCheckoutFailed("No data"))
         }
     })
     .catch(error => dispatch(cartCheckoutFailed(error)));

    
}

export const handleToastClose = () => dispatch => {
    dispatch(closeCartToast());
}
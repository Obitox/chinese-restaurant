import React from "react";
import { connect } from 'react-redux'
// import { Route, Redirect } from 'react-router'
import { push } from 'connected-react-router'

// Styling
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'

// import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
// import LogoutButton from "./LogoutButton.jsx";
import { logoutAction } from '../actions/home'
// import Login from "./Login.jsx"
import { tryLoadDataFromLocalStorage } from '../actions/home'
import { fetchItems, checkoutCart, addItemToCart, clearCartItems, loadCartFromLocalStorage } from '../actions/home'

import ItemDialog from './ItemDialog.jsx'
import CartDialog from './CartDialog.jsx'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csrf_token: '',
            size: '',
            open: false,
            item: { },
            isCartOpen: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.loadDataFromLocalStorage = this.loadDataFromLocalStorage.bind(this);
    }

    redirectLogin = () => {
        let path = `/login`;
        this.props.push(path);
    }

    redirectRegister = () => {
        let path = `/register`;
        this.props.push(path);
    }

    doLogout = () => {
        this.props.logoutAction(this.state.csrf_token)
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClickOpen = key => {
        let item = this.props.Items.find(function(item){
            if(item.ItemID == key){
                return item;
            }
        });
        this.setState({['open']: true, ['item']: item});
    }

    handleClose = () => {
        this.setState({['open']: false});
    }

    handleCartOpen = () => {
        this.setState({['isCartOpen']: true})
    }

    handleCartClose = () => {
        this.setState({['isCartOpen']: false});
    }

    addToCart = (item) => {
        this.props.addItemToCart(item);
        this.appendCartInLocalStorage(item);
    }

    appendCartInLocalStorage = (item) => {
        if(localStorage.hasOwnProperty("cart")){
            let cartItems = JSON.parse(localStorage.getItem("cart"));
            cartItems.push(item);
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
        else {
            let cartItems = [];
            cartItems.push(item);
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }

    indexElements = key => {
        let index = {
            open: false,
            key: key
        }

        this.setState((prevState) => {
            return {
                elementStates: prevState.elementStates.concat(index)
            };
        });
    }

    componentDidMount(){
        // FIXME: separate this request to action
        fetch(`http://localhost:3000/csrf`, {
            method: 'POST',
            credentials: 'include'
         })
         .then(res => res.json())
         .then(response => {
            this.setState({
                csrf_token: response._RequestAntiForgeryToken
            });
        });
        
        this.props.tryLoadDataFromLocalStorage();
        this.props.fetchItems();
        this.props.loadCartFromLocalStorage();
    }

    // loadDataFromLocalStorageWithoutRedux = () => {
    //     if(localStorage.hasOwnProperty("cart")){
    //         let cartItems = JSON.parse(localStorage.getItem("cart"));
    //         this.setState({['numItemsInCart']: cartItems.length, ['cartItems']: cartItems});
    //     }
    // }

    checkoutCart = () => {
        this.props.checkoutCart(this.props.Cart, this.state.csrf_token);
        this.props.clearCartItems();
    }

    resetCart = () => {
        localStorage.removeItem("cartItems");
        this.setState({['cartItems']: [], ['numItemsInCart']: 0});
    }

    render(){
        const isLoggedIn = this.props.IsAuthenticated;

        let button;
        if (isLoggedIn) {
            button = <div>
                        <input type="hidden" value={this.state.csrf_token}>
                        </input>
                        <button type="submit" onClick={this.doLogout}>
                            Logout
                        </button>
                        {/* <input type="text" defaultValue={this.state.csrf_token}></input>
                        <input type="text" name="username" onChange={this.handleChange} placeholder="Enter your username here"></input>
                        <input type="text" name="password" onChange={this.handleChange} placeholder="Enter your password here"></input>
                        <button type="submit" onClick={this.doLogin}>Login</button>
                        {this.props.loginData} */}
                      </div>;
        } else {
            button = <div>
                <Button variant="outlined" onClick={this.redirectLogin}>
                    Login
                </Button>
                <Button variant="outlined" onClick={this.redirectRegister}>
                    Register
                </Button>
            </div>;
        }

        let items = this.props.Items.map((item, index) =>
            // <li key={item.Item.ItemID}>{item.Item.Title}</li>
            <div className="item" key={index}>
                <p>
                    {item.Title}
                </p>
                <Button variant="outlined" onClick={() => this.handleClickOpen(item.ItemID)}>
                    Add to cart
                </Button>
                {/* <ItemDialog 
                    open={this.state.open}
                    item={item}
                ></ItemDialog> */}
            </div>
        );

        const IsOpen = this.state.open;

        let itemDialog;
        if(IsOpen){
            itemDialog = <div>
                            <ItemDialog 
                                open={this.state.open}
                                Item={this.state.item}
                                handleClose={this.handleClose}
                                addToCart={this.addToCart}
                            ></ItemDialog>
                         </div>
        }

        const isCartOpen = this.state.isCartOpen;

        let cart =  <div className="cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {this.props.Cart !== undefined ? <p>{this.props.Cart.length}</p> : <p>{0}</p>}
                        <Button variant="outlined" onClick={this.handleCartOpen}>
                            Go to cart
                        </Button>
                    </div>

        let cartDialog;
        if(isCartOpen){
            cartDialog = <div>
                            <CartDialog
                                open={this.state.isCartOpen}
                                cart={this.props.Cart.length == 0 ? [] :  this.props.Cart}
                                handleCartClose={this.handleCartClose}
                                checkoutCart={this.checkoutCart}
                            > 
                            </CartDialog>
                         </div>
        }

        return (
            <div>
                {button}
                <div className="container-items">
                    {items}
                    {itemDialog}
                    {cart}
                    {cartDialog}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        Username: state.homeReducer.Username,
        IsAuthenticated: state.homeReducer.IsAuthenticated,
        Items: state.homeReducer.Data,
        Cart: state.homeReducer.Cart,
        Message: state.homeReducer.Message
    };
}

const mapDispatchToProps = {
    tryLoadDataFromLocalStorage,
    logoutAction,
    fetchItems,
    checkoutCart,
    addItemToCart,
    clearCartItems,
    loadCartFromLocalStorage,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
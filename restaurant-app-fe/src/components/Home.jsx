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
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

// import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
// import LogoutButton from "./LogoutButton.jsx";
import { logoutAction } from '../actions/home'
// import Login from "./Login.jsx"
import { tryLoadDataFromLocalStroage } from '../actions/home'
import { fetchItems } from '../actions/home'

import ItemDialog from './ItemDialog.jsx'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csrf_token: '',
            size: '',
            open: false,
            object: { },
            numItemsInCart: 0,
            cartItems: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
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
        let element = this.props.Data.filter(function(el){
            if(el.Item.ItemID == key){
                return el.Item;
            }
        });
        this.setState({['open']: true, ['object']: element});
    }

    handleClose = () => {
        this.setState({['open']: false});
    }

    addToCart = (num, item) => {
        this.setState(prevState => ({
            numItemsInCart: prevState.numItemsInCart + parseInt(num),
            cartItems: prevState.cartItems.concat(item)
        }));
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
        this.props.tryLoadDataFromLocalStroage();
        this.props.fetchItems();
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

        let items = this.props.Data.map((object, key) =>
            // <li key={object.Item.ItemID}>{object.Item.Title}</li>
            <div className="item" key={object.Item.ItemID}>
                <p>
                    {object.Item.Title}
                </p>
                <Button variant="outlined" onClick={() => this.handleClickOpen(object.Item.ItemID)}>
                    Add to cart
                </Button>
                {/* <ItemDialog 
                    open={this.state.open}
                    object={object}
                ></ItemDialog> */}
            </div>
        );

        const IsOpen = this.state.open;

        let itemDialog;
        if(IsOpen){
            itemDialog = <div>
                            <ItemDialog 
                                open={this.state.open}
                                object={this.state.object}
                                handleClose={this.handleClose}
                                addToCart={this.addToCart}
                            ></ItemDialog>
                         </div>
        }

        let cart =  <div className="cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <p>{this.state.numItemsInCart}</p>
                    </div>

        return (
            <div>
                {button}
                <div className="container-items">
                    {items}
                    {itemDialog}
                    {cart}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Username: state.homeReducer.Username,
        IsAuthenticated: state.homeReducer.IsAuthenticated,
        Data: state.homeReducer.Data
    };
}

const mapDispatchToProps = {
    tryLoadDataFromLocalStroage,
    logoutAction,
    fetchItems,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
import React from "react";
import { connect } from 'react-redux'
// import { Route, Redirect } from 'react-router'
import { push } from 'connected-react-router'

// Styling
import Button from '@material-ui/core/Button';

// import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
// import LogoutButton from "./LogoutButton.jsx";
import { logoutAction } from '../actions/home'
// import Login from "./Login.jsx"
import { tryLoadDataFromLocalStroage } from '../actions/home'
import { fetchItems } from '../actions/home'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csrf_token: ''
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
            <div class="item" key={object.Item.ItemID}>
                <img src={object.Image.Path}></img>
                <p>
                    {object.Item.Title}
                </p>
                
            </div>
        );

        return (
            <div>
                {button}
                <div class="container-items">
                    {items}
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
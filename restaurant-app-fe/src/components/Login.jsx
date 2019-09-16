import React, { Component } from "react";
import { connect } from 'react-redux'
import {loginAction} from '../actions/login'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../assets/scss/login.scss'


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            csrf_token: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    componentDidMount (){
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


    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    doLogin(){
        console.log(this._Username.value);
        const user = {
            username: this._Username.value,
            password: this._Password.value
        };

        this.props.loginAction(user.username, user.password, this.state.csrf_token);
    }

    render(){
        return (
            <div className="container">
                <div className="login-container">
                {/* <input type="text" defaultValue={this.state.csrf_token}></input>
                <input type="text" name="username" onChange={this.handleChange} placeholder="Enter your username here"></input>
                <input type="text" name="password" onChange={this.handleChange} placeholder="Enter your password here"></input>
                <button type="submit" onClick={this.doLogin}>Login</button>
                {this.props.loginData} */}
                    <input
                        label="_RequestAntiForgeryToken"
                        name="_RequestAntiForgeryToken"
                        defaultValue={this.state.csrf_token}
                        type="hidden"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Username"
                        name="username"
                        className="login-username"
                        inputRef={textfield => this._Username = textfield}
                        // value={this.state.phone}
                        // onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className="login-password"
                        name="password"
                        type="password"
                        inputRef={textfield => this._Password = textfield}
                        // onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button 
                        onClick={this.doLogin}
                        variant="outlined"
                        className="login-button"
                        type="submit">
                        Login
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginData: state.loginReducer.Username,
        Message: state.loginReducer.Message
    };
}

const mapDispatchToProps = {
    loginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
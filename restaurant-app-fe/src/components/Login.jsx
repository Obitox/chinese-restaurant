import React, { Component } from "react";
import { connect } from 'react-redux'
import {loginAction} from '../actions/login'


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            csrf_token: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
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

    doLogin = () => {
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.loginAction(user.username, user.password, this.state.csrf_token);
    }

    render(){
        return (
            <div>
                <input type="text" defaultValue={this.state.csrf_token}></input>
                <input type="text" name="username" onChange={this.handleChange} placeholder="Enter your username here"></input>
                <input type="text" name="password" onChange={this.handleChange} placeholder="Enter your password here"></input>
                <button type="submit" onClick={this.doLogin}>Login</button>
                {this.props.loginData}
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
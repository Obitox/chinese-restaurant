import React, { Component } from "react";
import ReactDOM from "react-dom";


export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            form_token: 'Empty'
        }

        this.handleChange = this.handleChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.getCsrfToken = this.getCsrfToken.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.getCsrfToken();
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    getCsrfToken(){
        fetch('https://localhost:3030/login')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                this.setState({
                    form_token: data.token
                });
                console.log(this.state.form_token);
            });
    }

    doLogin(){
        const response = await fetch('https://localhost:3030/login', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        });
        return await response.json(); // parses JSON response into native Javascript objects
    }

    render(){
        const username = this.state.username
        const password = this.state.password
        return (
            <div>
                <p>
                    Username is: {username}
                </p>
                <br/>
                <p>
                    Password is: {password}
                </p>
                <input type="text" name="username" onChange={this.handleChange} placeholder="Enter your username"/>
                <input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password"/>
                <button type="submit" onClick={this.doLogin}>Login</button>
            </div>
        )
    }
}
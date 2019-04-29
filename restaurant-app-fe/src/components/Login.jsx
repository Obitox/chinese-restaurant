import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';


export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            csrf_token: ''
        }

        // this.handleChange = this.handleChange.bind(this);
        // this.doLogin = this.doLogin.bind(this);
        // this.getCsrfToken = this.getCsrfToken.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    componentDidMount (){
        axios({
            method: 'GET',
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // },
            url: "http://localhost:3000/token"
        })
        .then(response => {
            this.setState({
                csrf_token: response.data.token
            });
            // console.log(this.state.csrf_token);
            console.log(response.data.token);
        });
    }

    // handleChange(event){
    //     this.setState({[event.target.name]: event.target.value});
    // }

    getCsrfToken(){
        axios({
            method: 'GET',
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // },
            url: "http://localhost:3000/token"
        })
        .then(function(response){
            this.setState({
                csrf_token: data.token
            });
            // console.log(this.state.csrf_token);
            console.log(response);
        });

        // axios.get('http://localhost:3000/token')
        //         .then(function (response) {
        //             this.setState({
        //                 csrf_token: data.token
        //             });
        //             console.log(this.state.csrf_token);
        //             console.log(response);
        //         })
        //         .catch(function (error) {
        //             // handle error
        //             console.log(error);
        //         })
        //         .then(function () {
        //             // always executed
        //         });
        // fetch('https://localhost:3000/token', {
        //     method: 'GET',
        //     headers: {"Access-Control-Allow-Origin": "*"}}
        //     )
        //     .then(response => response.json())
        //     .then(function(data) {
        //         this.setState({
        //             csrf_token: data.token
        //         });
        //         console.log(this.state.csrf_token);
        //     });

            // const response = await fetch('https://localhost:3030/token', {
            //     method: "POST",
            //     mode: "cors",
            //     cache: "no-cache",
            //     // credentials: "same-origin",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     redirect: "follow",
            //     referrer: "no-referrer"
            //     // body: JSON.stringify({username: this.state.username, password: this.state.password}),
            // });
            // data = response.json();
            // this.setState('csrf_token', data.token);
            // return await response.json(); // parses JSON response into native Javascript objects
    }

    doLogin(){
        const token = this.state.csrf_token

        axios.post(`http://localhost:3000/login`, {token})
        .then(response => {
            console.log(response);
        });
    }

    render(){
        // const username = this.state.username
        // const password = this.state.password
        return (
            <div>
                {/* <p>
                    Username is: {username}
                </p>
                <br/>
                <p>
                    Password is: {password}
                </p> */}
                {/* <input type="text" name="username" onChange={this.handleChange} placeholder="Enter your username"/>
                <input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password"/> */}
                <input type="text" defaultValue={this.state.csrf_token}></input>
                <button type="submit" onClick={this.doLogin}>Login</button>
            </div>
        )
    }
}
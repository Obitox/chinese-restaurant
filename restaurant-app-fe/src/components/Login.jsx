import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
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

        // this.handleChange = this.handleChange.bind(this);
        // this.doLogin = this.doLogin.bind(this);
        // this.getCsrfToken = this.getCsrfToken.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    componentDidMount (){
        axios({
            method: 'POST',
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // },
            url: "http://localhost:3000/csrf"
        })
        .then(response => {
            this.setState({
                csrf_token: response.data._RequestAntiForgeryToken
            });
            // console.log(this.state.csrf_token);
            console.log(response.data._RequestAntiForgeryToken);
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.value);
    }

    getCsrfToken(){
        // axios({
        //     method: 'GET',
        //     // headers: {
        //     //     'Access-Control-Allow-Origin': '*'
        //     // },
        //     url: "http://localhost:3000/token"
        // })
        // .then(function(response){
        //     this.setState({
        //         csrf_token: response.data.token
        //     });
        //     // console.log(this.state.csrf_token);
        //     console.log(response);
        // });

        fetch(urlX, {
            method: 'POST', // or 'PUT'
            // body: JSON.stringify(user), // data can be `string` or {object}!
            body: JSON.stringify(user)
          }).then(res => res.json())
          .then(response => this.setState({
            csrf_token: response.data.token
            }))
          .catch(error => console.error('Error:', error));

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

    doLogin = () =>{
        // const instance = axios.create({
        //     baseURL: [`http://localhost:3000`],
        //     timeout: 5000,
        //     headers: {
        //       'Accept-Version': 1,
        //       'Accept': 'application/json',
        //       'Access-Control-Allow-Origin': '*',
        //       'Content-Type': 'application/json; charset=utf-8',
        //     },
        //   });

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.doLogin(user.username, user.password);

        // const urlX = `http://localhost:3000/login`;
        // console.log(JSON.stringify(user));
        // axios({
        //     method: 'POST',
        //     // headers: {
        //     //     'Access-Control-Allow-Origin': '*'
        //     // },
        //     url: urlX,
        //     data: JSON.stringify(user)
        // })
        // .then(function(response){
            
        //     // console.log(this.state.csrf_token);
        //     console.log(response);
        // });


        // fetch(urlX, {
        //     method: 'POST', // or 'PUT'
        //     // body: JSON.stringify(user), // data can be `string` or {object}!
        //     body: JSON.stringify(user)
        //   }).then(res => res.json())
        //   .then(response => console.log('Success:', JSON.stringify(response)))
        //   .catch(error => console.error('Error:', error));

        // axios({
        //     method: "POST",
        //     headers: {
        //         'Accept-Version': 1,
        //         'Accept': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json; charset=utf-8',
        //     },
        //     url: "http://localhost:3000/login",
        //     data: {user}
        // });

        // instance.post(`/login`, {user})
        // .then(response => {
        //     console.log(response);
        // });
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
                {/* <form onSubmit={this.doLogin}> */}
                    <input type="text" defaultValue={this.state.csrf_token}></input>
                    <input type="text" name="username" onChange={this.handleChange} placeholder="Enter your username here"></input>
                    <input type="text" name="password" onChange={this.handleChange} placeholder="Enter your password here"></input>
                    <button type="submit" onClick={this.doLogin}>Login</button>
                    {this.props.loginData}
                {/* </form> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginData: state.loginReducer.Username
    };
}

const mapActionsToProps = () => {
    doLogin: loginAction
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
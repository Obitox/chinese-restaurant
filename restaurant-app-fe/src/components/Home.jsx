import React from "react";
import { connect } from 'react-redux'

import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { tryLoadDataFromLocalStroage } from '../actions/home'

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.handleLoginClick = this.handleLoginClick.bind(this);
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);
        // this.state = {isLoggedIn: false};
        this.state = {

        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        console.log('Entered')
        this.props.tryLoadDataFromLocalStroage();
    }

    // handleLoginClick() {
    //     this.setState({isLoggedIn: true});
    // }

    // handleLogoutClick() {
    //     this.setState({isLoggedIn: false});
    // }

    render(){
        const isLoggedIn = this.props.IsAuthenticated;
        let button;

        console.log('PROPSU: ' + this.props.Username)

        if (isLoggedIn) {
            button = <LogoutButton /*onClick={this.handleLogoutClick}*/ />;
        } else {
            button = <LoginAndSignUpButton /*onClick={this.handleLoginClick}*/ />;
        }

        return (
            <div>
                {button}
                <p>
                    Currently logged in as: {this.props.Username}
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('STATEZ: ' + state.Username)
    // console.log('STATEZ: ' + state.IsAuthenticated)
    return {
        Username: state.homeReducer.Username,
        IsAuthenticated: state.homeReducer.IsAuthenticated
    };
}

const mapDispatchToProps = {
    tryLoadDataFromLocalStroage
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
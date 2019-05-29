import React from "react";
import ReactDOM from "react-dom";
import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
import LogoutButton from "./LogoutButton.jsx";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginAndSignUpButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                {button}
            </div>
        )
    }
}
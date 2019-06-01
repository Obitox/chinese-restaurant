import React from "react";
import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.handleLoginClick = this.handleLoginClick.bind(this);
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);
        // this.state = {isLoggedIn: false};
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

        if (isLoggedIn) {
            button = <LogoutButton /*onClick={this.handleLogoutClick}*/ />;
        } else {
            button = <LoginAndSignUpButton /*onClick={this.handleLoginClick}*/ />;
        }

        return (
            <div>
                {button}
            </div>
        )
    }
}

export default connect()(Home)
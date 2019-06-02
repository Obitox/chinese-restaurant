import React from "react";
import { connect } from 'react-redux'

import LoginAndSignUpButton from "./LoginAndSignUpButton.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { tryLoadDataFromLocalStroage } from '../actions/home'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.props.tryLoadDataFromLocalStroage();
    }

    render(){
        const isLoggedIn = this.props.IsAuthenticated;
        let button;

        console.log('PROPSU: ' + this.props.Username)

        if (isLoggedIn) {
            button = <LogoutButton />;
        } else {
            button = <LoginAndSignUpButton />;
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
    return {
        Username: state.homeReducer.Username,
        IsAuthenticated: state.homeReducer.IsAuthenticated
    };
}

const mapDispatchToProps = {
    tryLoadDataFromLocalStroage
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
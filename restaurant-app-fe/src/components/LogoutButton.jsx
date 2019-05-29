import React from "react";

export default class LogoutButton extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <button type="submit" onClick={this.props.onClick}>
                Logout
            </button>
        )
    }
}
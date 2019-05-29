import React from "react";

export default class LoginAndSignUpButton extends React.Component { 
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <button type="submit" onClick={this.props.onClick}>
                Login
                </button>
                <button type="submit" onClick={this.props.onClick}>
                    Sign up
                </button>   
            </div>     
        )
    }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Performance
import { throttle } from 'throttle-debounce';


// Styling
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: '',
            address1: '',
            address2: '',
            address3: '',
            phone: '',
            IsUsernameValid: false,
            IsPasswordValid: false,
            IsEmailValid: false,
            IsFirstNameValid: false,
            IsLastNameValid: false,
            IsAddress1Valid: false,
            IsPhoneValid: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }


    validateField(fieldName, fieldValue){
        let IsUsernameValid  = this.state.IsUsernameValid;
        let IsPasswordValid  = this.state.IsPasswordValid;
        let IsEmailValid     = this.state.IsEmailValid;
        let IsFirstNameValid = this.state.IsFirstNameValid;
        let IsLastNameValid  = this.state.IsLastNameValid;
        let IsAddress1Valid  = this.state.IsAddress1Valid;
        let IsPhoneValid     = this.state.IsPhoneValid;
    
        switch(fieldName){
            case 'username':
                IsUsernameValid = /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/.test(fieldValue);
                break;
            case 'password':
                IsPasswordValid = /^[A-Za-z0-9!@#$^&]{6,20}$/.test(fieldValue);
                break;
            case 'email':
                IsEmailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(fieldValue);
                break;
            case 'firstname':
                IsFirstNameValid = /^[A-Z]{1}[a-z]{1,99}$/.test(fieldValue);
                break;
            case 'lastname':
                IsLastNameValid = /^[A-Z]{1}[a-z]{1,99}$/.test(fieldValue);
                break;
            case 'address1':
                IsAddress1Valid = /^[A-Za-z0-9]{1,}[. ]{0,}[A-Za-z0-9 \/.]{0,}$/.test(fieldValue);
                break;
            case 'address2':
                break;
            case 'address3':
                break;
            case 'phone':
                IsPhoneValid = /^06[0-9]{2,8}$/.test(fieldValue);
                break;
            default:
                break;
        }

        this.setState({
            IsUsernameValid: IsUsernameValid,
            IsPasswordValid: IsPasswordValid,
            IsEmailValid: IsEmailValid,
            IsFirstNameValid: IsFirstNameValid,
            IsLastNameValid: IsLastNameValid,
            IsAddress1Valid: IsAddress1Valid,
            IsPhoneValid: IsPhoneValid,
        });
    }
    
    handleChange = event => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.setState({[fieldName]: fieldValue}, throttle(250, () => {this.validateField(fieldName, fieldValue)}));
    }
    
    handleSubmit(event){
        event.preventDefault();
    }

    // username: '',
    // password: '',
    // email: '',
    // firstname: '',
    // lastname: '',
    // address1: '',
    // address2: '',
    // address3: '',
    // phone: ''

    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    error={!this.state.IsUsernameValid}
                    id="outlined-name"
                    label="Username*"
                    name="username"
                    // value={this.state.username}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    error={!this.state.IsPasswordValid}
                    id="outlined-password-input"
                    label="Password*"
                    name="password"
                    // value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    error={!this.state.IsEmailValid}
                    id="outlined-email-input"
                    label="Email*"
                    name="email"
                    // value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    error={!this.state.IsFirstNameValid}
                    id="outlined-name"
                    label="First name*"
                    name="firstname"
                    // value={this.state.firstname}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    error={!this.state.IsLastNameValid}
                    id="outlined-name"
                    label="Last name*"
                    name="lastname"
                    // value={this.state.lastname}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    error={!this.state.IsAddress1Valid}
                    id="outlined-name"
                    label="Address1*"
                    name="address1"
                    // value={this.state.address1}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Address2"
                    name="address2"
                    // value={this.state.address2}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Address3*"
                    name="address3"
                    // value={this.state.address3}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    error={!this.state.IsPhoneValid}
                    id="outlined-name"
                    label="Phone*"
                    name="phone"
                    // value={this.state.phone}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <Button disabled={ 
                    !(this.state.IsUsernameValid  &&
                      this.state.IsPasswordValid  &&
                      this.state.IsEmailValid     &&
                      this.state.IsFirstNameValid &&
                      this.state.IsLastNameValid  &&
                      this.state.IsAddress1Valid  &&
                      this.state.IsPhoneValid)} variant="outlined">
                    Register
                </Button>
                {/* <label>
                    Username*:
                    <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />
                </label> */}
                {/* <label>
                    Password*:
                    <input type="password" name="password" value={this.state.value} onChange={this.handleChange} />
                </label> */}
                {/* <label>
                    Email*:
                    <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
                </label> */}
                {/* <label>
                    First name*:
                    <input type="text" name="firstname" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Last name*:
                    <input type="text" name="lastname" value={this.state.value} onChange={this.handleChange} />
                </label> */}
                {/* <label>
                    Address1*:
                    <input type="text" name="address1" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Address2:
                    <input type="text" name="address2" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Address3:
                    <input type="text" name="address3" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Phone*:
                    <input type="text" name="phone" value={this.state.value} onChange={this.handleChange} />
                </label> */}
                {/* <input type="submit" value="Submit" /> */}
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = {
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
import React, { Component } from 'react';
import { connect } from 'react-redux';


// Styling
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = {
    
}

const [values, setValues] = React.useState({
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    address1: '',
    address2: '',
    address3: '',
    phone: ''
  });

const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
};

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
            phone: ''
        };
    }
    
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    
    handleSubmit = (event) => {
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

    validateField = (fieldName, fieldValue) => {
        // TODO: 
        // Regex for each field
        // Implement this method with material ui
        // Test it

        switch(fieldName){
            case 'username':
                break;
            case 'password':
                break;
            case 'email':
                break;
            case 'firstname':
                break;
            case 'lastname':
                break;
            case 'address1':
                break;
            case 'address2':
                break;
            case 'address3':
                break;
             case 'phone':
                break;
        }
    }

    render() {
        // UserID                                                                                                             uint64
// Username, Password, Role, FirstName, LastName, Address1, Address2, Address3, Phone, Email, RequestAntiForgeryToken
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="outlined-name"
                    label="Username*"
                    value={values.username}
                    onChange={handleChange('username')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password*"
                    value={values.password}
                    onChange={handleChange('password')}
                    type="password"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-email-input"
                    label="Email*"
                    value={values.email}
                    onChange={handleChange('email')}
                    type="email"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="First name*"
                    value={values.firstname}
                    onChange={handleChange('firstname')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Last name*"
                    value={values.lastname}
                    onChange={handleChange('lastname')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Address1*"
                    value={values.address1}
                    onChange={handleChange('address1')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Address2"
                    value={values.address2}
                    onChange={handleChange('address2')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Address3*"
                    value={values.address3}
                    onChange={handleChange('address3')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Phone*"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="outlined">
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
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
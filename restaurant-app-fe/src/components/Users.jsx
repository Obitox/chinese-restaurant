import React, { Component } from 'react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import UserList from './UserList.jsx'
import { addUser, updateUser, deleteUser, handleUserSnackbarClose, fetchUsers } from '../actions/adminDashboard'

// Styling
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
// import DeleteIcon from '@material-ui/icons/Delete';


const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon
  };
  
const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
}


class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            csrf_token: '',
            switches: [],
            users: [],
            user: {
                Username: '',
                Password: '',
                Role: '',
                FirstName: '',
                LastName: '',
                Address1: '',
                Address2: '',
                Address3: '',
                Phone: '',
                Email: ''
            }
        };
        // this.username = React.createRef();
        // this.password = React.createRef();
        // this.role = React.createRef();
        // this.firstname = React.createRef();
        // this.lastname = React.createRef();
        // this.address1 = React.createRef();
        // this.address2 = React.createRef();
        // this.address3 = React.createRef();
        // this.phone = React.createRef();
        // this.email = React.createRef();

        this.componentDidMount = this.componentDidMount.bind(this);
        // this.initSwitches = this.initSwitches.bind(this);
        this.getSwitchState = this.getSwitchState.bind(this);

    }

    async componentDidMount(){
        // this.initSwitches(this.props.Users);
        // if(this.props.Users !== undefined){
        //     this.props.Users.forEach(this.initSwitches);
        // }
        const response = await fetch(`http://localhost:3000/csrf`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
        const json = await response.json();
        this.setState({['csrf_token']: json._RequestAntiForgeryToken, ['users']: this.props.Users});

        this.props.fetchUsers(this.state.csrf_token);
    }

    // componentDidUpdate = () => {
    //     this.initSwitches(this.props.Users);
    // };

    initSwitches = (user) => {
        // let userSwitch = {
        //     key: 0,
        //     value: false
        // }
        // var tempUserSwitches = this.state.switches;
        // console.log('HAPPEND');
        // console.log(users);

        // for(var i = 0; i < users.length;i++){
        //     // console.log(i);
        //     userSwitch.key = users[i].UserID;
        //     // console.log('KEY: ' + userSwitch.key);
        //     console.log(userSwitch);
        //     tempUserSwitches.push(userSwitch);
        //     // console.log(tempUserSwitches);
        // }
        // this.setState({['switches']: tempUserSwitches})
        let userSwitch = {
            key: user.UserID,
            value: false
        }

        this.setState(prevState => ({
            switches: [...prevState.switches, userSwitch]
        }))
      
        // let tempUserSwitches = this.state.switches;
        // tempUserSwitches.push(userSwitch);
        // this.setState({['switches']: tempUserSwitches})
    }

    getSwitchState(switches, key){
        // this.state.switches.filter(function(userSwitch){
        //   if(userSwitch.key == key){
        //     return userSwitch.value;
        //   }
        // });
        // return false;

        for(var i=0; i < switches.length; i++){
            if(switches[i].key == key){
              return switches[i].value;
            }
          }
        return false;
    }

    // FIXME: Find a better way
    handleEditingSwitch(event, key){
        let switches = this.state.switches;
        let updatedSwitches = [];
        for(var i =0; i < switches.length; i++){
            if(switches[i].key == key){
                switches[i].value = event.target.checked;
            }
            updatedSwitches.push(switches[i]);
        }
        this.setState({['switches']: updatedSwitches})
    }
 
    updateUser = (user) => {
        // console.log(user);
        this.props.updateUser(user, this.state.csrf_token);
    }

    deleteUser = (index) => {
        this.props.deleteUser(this.state.users[index], this.state.csrf_token);
        this.setState(prevState => ({
            users: prevState.users.filter(user => user.UserID !== userID)
        }));

        // if(this.props.Message == "OK"){
        //     console.log(this.props.Users)
        //     this.setState({['users']: this.props.Users});
        // }
    }

    addUser = (newUser) => {
        console.log(newUser)
        this.props.addUser(newUser, this.state.csrf_token);
        this.setState(prevState => ({
            users: [...prevState.users, newUser]
        }))
    }

    handleChange = (event, index) => {
        let name = event.target.name;
        let value = event.target.value;
        let users = this.state.users;

        users[index][name] = value;
        this.setState({['users']: users});

        // switch(event.target.name){
        //     case "userid":
        //         users[index].UserID = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "username":
        //         users[index].Username = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "password":
        //         users[index].Password = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "role":
        //         users[index].Role = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "firstname":
        //         users[index].FirstName = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "lastname":
        //         users[index].LastName = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "address1":
        //         users[index].Address1 = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "phone":
        //         users[index].Phone = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        //     case "email":
        //         users[index].Email = event.target.value;
        //         this.setState({['users']: users});
        //         break;
        // }
    }

    handleNewUserChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        let user = this.state.user;
        user[name] = value;

        this.setState({user: user})
    }

    render() {
        let users = this.state.users !== undefined ? this.state.users.map((user, index) => 
            <tr key={index}>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="UserID"
                        value={user.UserID}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Username"
                        value={user.Username}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Password"
                        value={user.Password}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        type="password"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Role"
                        value={user.Role}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="FirstName"
                        value={user.FirstName}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="LastName"
                        value={user.LastName}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Address1"
                        value={user.Address1}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Address2"
                        // value={this.state.username}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Address3"
                        // value={this.state.username}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Phone"
                        value={user.Phone}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Email"
                        value={user.Email}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.getSwitchState(this.state.switches, user.UserID)}
                            onChange={(event) => this.handleEditingSwitch(event, user.UserID)}
                            value={user.UserID}
                            color="primary"
                        />
                    }
                    label="Editing"
                />
                {/* <Fab disabled={!this.getSwitchState(this.state.switches, user.UserID)} color="primary" aria-label="edit" size="small">
                    <EditIcon />
                </Fab> */}
                <Fab disabled={!this.getSwitchState(this.state.switches, user.UserID)} onClick={() => this.deleteUser(index)} color="secondary" aria-label="delete" size="small">
                    <DeleteIcon />
                </Fab>
                <Fab disabled={!this.getSwitchState(this.state.switches, user.UserID)} onClick={() => this.updateUser(this.state.users[index])} color="primary" aria-label="save" size="small">
                    <SaveIcon />
                </Fab>
                </td>
            </tr>
            
        ) : (<tr><td>Error</td></tr>);

        let userAdd = 
                (
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Username
                                </th>
                                <th>
                                    Password
                                </th>
                                <th>
                                    Role
                                </th>
                                <th>
                                    Firstname
                                </th>
                                <th>
                                    Lastname
                                </th>
                                <th>
                                    Address1
                                </th>
                                <th>
                                    Address2
                                </th>
                                <th>
                                    Address3
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Username"
                                        defaultValue={this.state.user.Username}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Password"
                                        value={this.state.user.Password}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        type="password"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Role"
                                        value={this.state.user.Role}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="FirstName"
                                        value={this.state.user.FirstName}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="LastName"
                                        value={this.state.user.LastName}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Address1"
                                        value={this.state.user.Address1}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Address2"
                                        value={this.state.user.Address2}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Address3"
                                        value={this.state.user.Address3}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Phone"
                                        value={this.state.user.Phone}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                                        id="standard-bare"
                                        name="Email"
                                        value={this.state.user.Email}
                                        onChange={this.handleNewUserChange}
                                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <Fab onClick={() => this.addUser(this.state.user)} color="primary" aria-label="add" size="small">
                                        <PersonAddIcon />
                                    </Fab>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );


        // let userAdd = 
        //         (
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>
        //                             Username
        //                         </th>
        //                         <th>
        //                             Password
        //                         </th>
        //                         <th>
        //                             Role
        //                         </th>
        //                         <th>
        //                             Firstname
        //                         </th>
        //                         <th>
        //                             Lastname
        //                         </th>
        //                         <th>
        //                             Address1
        //                         </th>
        //                         <th>
        //                             Address2
        //                         </th>
        //                         <th>
        //                             Address3
        //                         </th>
        //                         <th>
        //                             Phone
        //                         </th>
        //                         <th>
        //                             Email
        //                         </th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Username"
        //                                 ref={this.username}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Password"
        //                                 ref={this.password}
        //                                 // value={this.state.user.Password}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 type="password"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Role"
        //                                 ref={this.role}
        //                                 // value={this.state.user.Role}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="FirstName"
        //                                 ref={this.firstname}
        //                                 // value={this.state.user.FirstName}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="LastName"
        //                                 ref={this.lastname}
        //                                 // value={this.state.user.LastName}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Address1"
        //                                 ref={this.address1}
        //                                 // value={this.state.user.Address1}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Address2"
        //                                 ref={this.address2}
        //                                 // value={this.state.user.Address2}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Address3"
        //                                 ref={this.address3}
        //                                 // value={this.state.user.Address3}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Phone"
        //                                 ref={this.phone}
        //                                 // value={this.state.user.Phone}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <TextField
        //                                 // error={!this.state.IsUsernameValid}
        //                                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                                 id="standard-bare"
        //                                 name="Email"
        //                                 ref={this.email}
        //                                 // value={this.state.user.Email}
        //                                 // onChange={this.handleNewUserChange}
        //                                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                                 margin="normal"
        //                                 variant="outlined"
        //                             />
        //                         </td>
        //                         <td>
        //                             <Fab onClick={() => this.addUser({
        //                                 Username: this.username.value,
        //                                 Password: this.password.current.value,
        //                                 Role: this.role.current.value,
        //                                 FirstName: this.firstname.current.value,
        //                                 LastName: this.lastname.current.value,
        //                                 Address1: this.address1.current.value,
        //                                 Address2: this.address2.current.value,
        //                                 Address3: this.address3.current.value,
        //                                 Phone: this.phone.current.value,
        //                                 Email: this.email.current.value
        //                             })} color="primary" aria-label="add" size="small">
        //                                 <PersonAddIcon />
        //                             </Fab>
        //                         </td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         );


        const {
            IsFetchingUsers
        } = this.props;

        if(IsFetchingUsers){
            return <div>Loading</div>;
        }

        return (
            //<div>
            //     <table>
            //         <thead>
            //             <tr>
            //                 <th>
            //                     UserID
            //                 </th>
            //                 <th>
            //                     Username
            //                 </th>
            //                 <th>
            //                     Password
            //                 </th>
            //                 <th>
            //                     Role
            //                 </th>
            //                 <th>
            //                     Firstname
            //                 </th>
            //                 <th>
            //                     Lastname
            //                 </th>
            //                 <th>
            //                     Address1
            //                 </th>
            //                 <th>
            //                     Address2
            //                 </th>
            //                 <th>
            //                     Address3
            //                 </th>
            //                 <th>
            //                     Phone
            //                 </th>
            //                 <th>
            //                     Email
            //                 </th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {users}
            //         </tbody>
            //     </table>
            <div>
                <UserList csrf={this.state.csrf_token} />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.props.Open}
                    autoHideDuration={6000}
                    onClose={this.props.handleUserSnackbarClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.props.handleUserSnackbarClose}
                        variant={this.props.IsSuccessful ? 'success': 'error'}
                        message={this.props.Message}
                    />
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Users: state.usersReducer.Users,
        Open: state.usersReducer.Open,
        IsSuccessful: state.usersReducer.IsSuccessful,
        Message: state.usersReducer.Message
        // Message: state.usersReducer.Message
    };
}

const mapDispatchToProps = {
    addUser,
    updateUser,
    deleteUser,
    handleUserSnackbarClose,
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
import React, { Component } from 'react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

// Styling
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
// import DeleteIcon from '@material-ui/icons/Delete';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            csrf_token: '',
            switches: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.initSwitches = this.initSwitches.bind(this);
        this.getSwitchState = this.getSwitchState.bind(this);
    }

    async componentDidMount(){
        // this.initSwitches(this.props.Users);
        if(this.props.Users !== undefined){
            this.props.Users.forEach(this.initSwitches);
        }
        const response = await fetch(`http://localhost:3000/csrf`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
        const json = await response.json();
        this.setState({['csrf_token']: json._RequestAntiForgeryToken});
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

    render() {
        // this.props.Users.forEach(this.initSwitches);

        let users = this.props.Users !== undefined ? this.props.Users.map((user, index) => 
            <tr key={index}>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="userid"
                        value={user.UserID}
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
                        name="username"
                        value={user.Username}
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
                        name="password"
                        value={user.Password}
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
                        name="role"
                        value={user.Role}
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
                        name="firstname"
                        value={user.FirstName}
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
                        name="lastname"
                        value={user.LastName}
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
                        name="address1"
                        value={user.Address1}
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
                        name="address2"
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
                        name="address3"
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
                        name="phone"
                        value={user.Phone}
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
                        name="email"
                        value={user.Email}
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
                <Fab disabled={!this.getSwitchState(this.state.switches, user.UserID)} color="primary" aria-label="edit" size="small">
                    <EditIcon />
                </Fab>
                <Fab disabled={!this.getSwitchState(this.state.switches, user.UserID)} color="secondary" aria-label="delete" size="small">
                    <DeleteIcon />
                </Fab>
                <Fab disabled={!this.getSwitchState(this.state.switches, user.UserID)} color="primary" aria-label="save" size="small">
                    <SaveIcon />
                </Fab>
                </td>
            </tr>
            
        ) : <tr><td>Error</td></tr>

        return (
            <div>
                {/* <p>YOYOYOYO</p> */}
                <table>
                    <thead>
                        <tr>
                            <th>
                                UserID
                            </th>
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
                        {users}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Users: state.usersReducer.Users
    };
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
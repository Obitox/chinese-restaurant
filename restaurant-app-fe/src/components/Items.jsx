import React, { Component } from 'react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

// STYLING
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'

class Items extends Component {
    constructor(props){
        super(props);

        // Title
        // </th>
        // <th>
        //     Description
        // </th>
        // <th>
        //     Mass
        // </th>
        // <th>
        //     Calorie count
        // </th>
        // <th>
        //     Price

        this.state = {
            csrf_token: '',
            items: [],
            item: {
                Title: '',
                Description: '',
                Mass: 0,
                CalorieCount: 0,
                Price: 0
            },
            switches: [],
            categories: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){
        if(this.props.Items !== undefined){
            this.props.Items.forEach(this.initSwitches);
        }
        const response = await fetch(`http://localhost:3000/csrf`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
        const json = await response.json();
        this.setState({['csrf_token']: json._RequestAntiForgeryToken, ['items']: this.props.Items, ['categories']: this.props.Categories});
    }

    initSwitches = (item) => {
        let itemSwitch = {
            key: item.ItemID,
            value: false
        }

        this.setState(prevState => ({
            switches: [...prevState.switches, itemSwitch]
        }))
    }

    getSwitchState(switches, key){
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

    handleChange = (event, index) => {
        let name = event.target.name;
        let value = event.target.value;
        let items = this.state.items;

        items[index][name] = value;
        this.setState({['items']: items});
    }

    handleNewItemChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        let item = this.state.item;
        item[name] = value;

        this.setState({item: item})
    }

    handleSelect = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        let items = this.state.items !== undefined ? this.state.items.map((item, index) => 
            <tr key={index}>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-bare"
                        name="ItemID"
                        value={item.ItemID}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-bare"
                        name="Title"
                        value={item.Title}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-bare"
                        name="Description"
                        value={item.Description}
                        onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-number"
                        name="Mass"
                        value={item.Mass}
                        onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-number"
                        name="CalorieCount"
                        value={item.CalorieCount}
                        onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />
                </td>
                <td>
                    <TextField
                        disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-number"
                        name="Price"
                        value={item.Price}
                        onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        varirant="outlined"
                    />
                </td>
                <td>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.getSwitchState(this.state.switches, item.ItemID)}
                                onChange={(event) => this.handleEditingSwitch(event, item.ItemID)}
                                value={item.ItemID}
                                color="primary"
                            />
                        }
                        label="Editing"
                    />
                    {/* <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} color="primary" aria-label="edit" size="small">
                        <EditIcon />
                    </Fab> */}
                    <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.deleteUser(index)} color="secondary" aria-label="delete" size="small">
                        <DeleteIcon />
                    </Fab>
                    <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.updateUser(this.state.users[index])} color="primary" aria-label="save" size="small">
                        <SaveIcon />
                    </Fab>
                </td>
            </tr>
            
        ) : (<tr><td>Error</td></tr>);

        let categories = this.props.Categories.map((category, index) => 
                                          <MenuItem key={index} value={category.Title}>{category.Title}</MenuItem>
        );


        let itemAdd = (
            <table>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Mass
                        </th>
                        <th>
                            Calorie count
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Category
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
                                name="Title"
                                value={this.state.item.Title}
                                onChange={this.handleNewItemChange}
                                // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                                margin="normal"
                                variant="outlined"
                            />
                        </td>
                        <td>
                            <TextField
                                // error={!this.state.IsUsernameValid}
                                id="standard-number"
                                name="Mass"
                                value={this.state.item.Mass}
                                onChange={(event) => this.handleChange(event, index)}
                                type="number"
                                // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </td>
                        <td>
                            <TextField
                                // error={!this.state.IsUsernameValid}
                                id="standard-number"
                                name="CalorieCount"
                                value={this.state.item.CalorieCount}
                                onChange={(event) => this.handleChange(event, index)}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                margin="normal"
                                variant="outlined"
                            />
                        </td>
                        <td>
                            <TextField
                                id="standard-number"
                                name="Price"
                                value={this.state.item.Price}
                                onChange={(event) => this.handleChange(event, index)}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                varirant="outlined"
                            />
                        </td>
                        <td>
                        <FormControl>
                            <Select
                                    value={this.state.categories}
                                    onChange={this.handleSelect}
                                    inputProps={{
                                    name: 'categories',
                                    id: 'categories',
                                }}
                            >
                            {categories}
                        </Select>
                            <FormHelperText>Without label</FormHelperText>
                        </FormControl>
                        </td>
                        <td>
                            <Fab onClick={() => this.addItem(this.state.item)} color="primary" aria-label="add" size="small">
                                <AddCircleIcon />
                            </Fab>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ItemID
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Mass
                            </th>
                            <th>
                                Calorie count
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                {itemAdd}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Items: state.itemsReducer.Items,
        Categories: state.categoriesReducer.Categories
    };
}

const mapDispatchToProps = {
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
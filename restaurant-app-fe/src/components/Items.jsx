import React, { Component } from 'react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import ItemList from './ItemList.jsx'

// STYLING
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class Items extends Component {
    constructor(props){
        super(props);
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
            categories: [],
            ingredients: [],
            checkboxes: []
        }

        this.TitleRef = React.createRef();
        this.Description = React.createRef();
        this.Mass = React.createRef();
        this.CalorieCount = React.createRef();
        this.Price = React.createRef();
        this.Categories = React.createRef();

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){
        if(this.props.Items !== undefined){
            this.props.Items.forEach(this.initSwitches);
        }

        if(this.props.Ingredients !== undefined){
            this.props.Ingredients.forEach(this.initCheckboxes);
        }

        const response = await fetch(`http://localhost:3000/csrf`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
        const json = await response.json();
        this.setState({['csrf_token']: json._RequestAntiForgeryToken, ['items']: this.props.Items, ['categories']: this.props.Categories, ['ingredients']: this.props.Ingredients});
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

    initCheckboxes = (ingredient) => {
        let checkbox = {
            key: ingredient.IngredientID,
            value: false
        }

        this.setState(prevState => ({
            checkboxes: [...prevState.checkboxes, checkbox]
        }))
    }

    handleIngredientCheck(event, key){
        let checkboxes = this.state.checkboxes;
        let updatedCheckboxes = [];
        for(var i =0; i < checkboxes.length; i++){
          if(checkboxes[i].key == key){
            checkboxes[i].value = event.target.checked;
          }
          updatedCheckboxes.push(checkboxes[i]);
        }
        this.setState({['checkboxes']: updatedCheckboxes})
    }

    getCheckboxState(checkboxes, key){
        for(var i=0; i < checkboxes.length; i++){
            if(checkboxes[i].key == key){
              return checkboxes[i].value;
            }
          }
        return false;
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

    addItem = (event) => {
        event.preventDefault();

        console.log(this._Title.value);

        // let item = {
        //     Title: this.TitleRef.current.value,
        //     Description: this.Description.current.value,
        //     Mass: this.Mass.current.value,
        //     CalorieCount: this.CalorieCount.current.value,
        //     Price: this.Price.current.value,
        //     Ingredients: []
        // };


        // let checkboxes = this.state.checkboxes.filter(checkbox => checkbox.value == true);
        // let ingredients = [];

        // for(var i = 0; i < checkboxes.length; i++){
        //     ingredients.push(this.state.ingredients.find(ingredient => ingredient.IngredientID == checkboxes[i].key));
        // }
        
        // item.Ingredients = ingredients;
        // console.log(item.Ingredients);
        // console.log(item);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.Items.ItemID === nextProps.Items.ItemID) {
    //         console.log('DID WORK')
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    openItem = (itemID) => {
        this.props.openItem(itemID);
    }


    render() {
        // let items = this.state.items !== undefined ? this.state.items.map((item, index) => 
        //     <tr key={index}>
        //         <td>
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
        //                 id="standard-bare"
        //                 name="ItemID"
        //                 value={item.ItemID}
        //                 onChange={(event) => this.handleChange(event, index)}
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //         </td>
        //         <td>
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
        //                 id="standard-bare"
        //                 name="Title"
        //                 value={item.Title}
        //                 onChange={(event) => this.handleChange(event, index)}
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //         </td>
        //         <td>
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
        //                 id="standard-bare"
        //                 name="Description"
        //                 value={item.Description}
        //                 onChange={(event) => this.handleChange(event, index)}
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //         </td>
        //         <td>
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
        //                 id="standard-number"
        //                 name="Mass"
        //                 value={item.Mass}
        //                 onChange={(event) => this.handleChange(event, index)}
        //                 type="number"
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //         </td>
        //         <td>
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
        //                 id="standard-number"
        //                 name="CalorieCount"
        //                 value={item.CalorieCount}
        //                 onChange={(event) => this.handleChange(event, index)}
        //                 type="number"
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //         </td>
        //         <td>
        //             <TextField
        //                 disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
        //                 id="standard-number"
        //                 name="Price"
        //                 value={item.Price}
        //                 onChange={(event) => this.handleChange(event, index)}
        //                 type="number"
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 margin="normal"
        //                 varirant="outlined"
        //             />
        //         </td>
        //         <td>
        //             <FormControlLabel
        //                 control={
        //                     <Switch
        //                         checked={this.getSwitchState(this.state.switches, item.ItemID)}
        //                         onChange={(event) => this.handleEditingSwitch(event, item.ItemID)}
        //                         value={item.ItemID}
        //                         color="primary"
        //                     />
        //                 }
        //                 label="Editing"
        //             />
        //             {/* <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} color="primary" aria-label="edit" size="small">
        //                 <EditIcon />
        //             </Fab> */}
        //             <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.deleteUser(index)} color="secondary" aria-label="delete" size="small">
        //                 <DeleteIcon />
        //             </Fab>
        //             <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.updateUser(this.state.users[index])} color="primary" aria-label="save" size="small">
        //                 <SaveIcon />
        //             </Fab>
        //         </td>
        //     </tr>
            
        // ) : (<tr><td>Error</td></tr>);

        let categories = this.props.Categories.map((category, index) => 
                                          <MenuItem key={index} value={category.Title}>{category.Title}</MenuItem>
        );

        // FIXME: fix this ugly menace
        let ingredients = this.props.Ingredients.map((ingredient, index) => 
            <FormControlLabel
            key={index}
            control={
                <Checkbox
                    key={ingredient.IngredientID}
                    checked={this.getCheckboxState(this.state.checkboxes, ingredient.IngredientID)}
                    onChange={(event) => this.handleIngredientCheck(event,  ingredient.IngredientID)} 
                    value={ingredient.Title} 
                />
            }
            label={ingredient.Title}
            />
        );


        // let itemAdd = (
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>
        //                     Title
        //                 </th>
        //                 <th>
        //                     Description
        //                 </th>
        //                 <th>
        //                     Mass
        //                 </th>
        //                 <th>
        //                     Calorie count
        //                 </th>
        //                 <th>
        //                     Price
        //                 </th>
        //                 <th>
        //                     Category
        //                 </th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>
        //                     <TextField
        //                         // error={!this.state.IsUsernameValid}
        //                         // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                         id="standard-bare"
        //                         name="Title"
        //                         ref={this.title}
        //                         // value={this.state.item.Title}
        //                         // onChange={this.handleNewItemChange}
        //                         // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                         type="text"
        //                         margin="normal"
        //                         variant="outlined"
        //                     />
        //                 </td>
        //                 <td>
        //                     <TextField
        //                         // error={!this.state.IsUsernameValid}
        //                         // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                         id="standard-bare"
        //                         name="Description"
        //                         ref={(input) => {this.Description = input}}
        //                         // value={this.state.item.Description}
        //                         // onChange={this.handleNewItemChange}
        //                         // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                         type="text"
        //                         margin="normal"
        //                         variant="outlined"
        //                     />
        //                 </td>
        //                 <td>
        //                     <TextField
        //                         // error={!this.state.IsUsernameValid}
        //                         id="standard-number"
        //                         name="Mass"
        //                         ref={(input) => {this.Mass = input}}
        //                         // value={this.state.item.Mass}
        //                         // onChange={(event) => this.handleChange(event, index)}
        //                         type="number"
        //                         // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                         InputLabelProps={{
        //                             shrink: true,
        //                         }}
        //                         margin="normal"
        //                         variant="outlined"
        //                     />
        //                 </td>
        //                 <td>
        //                     <TextField
        //                         // error={!this.state.IsUsernameValid}
        //                         id="standard-number"
        //                         name="CalorieCount"
        //                         ref={(input) => {this.CalorieCount = input}}
        //                         // value={this.state.item.CalorieCount}
        //                         // onChange={(event) => this.handleChange(event, index)}
        //                         type="number"
        //                         InputLabelProps={{
        //                             shrink: true,
        //                         }}
        //                         // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                         margin="normal"
        //                         variant="outlined"
        //                     />
        //                 </td>
        //                 <td>
        //                     <TextField
        //                         id="standard-number"
        //                         name="Price"
        //                         ref={(input) => {this.Price = input}}
        //                         // value={this.state.item.Price}
        //                         // onChange={(event) => this.handleChange(event, index)}
        //                         type="number"
        //                         InputLabelProps={{
        //                             shrink: true,
        //                         }}
        //                         margin="normal"
        //                         varirant="outlined"
        //                     />
        //                 </td>
        //                 <td>
        //                 <FormControl>
        //                     <Select
        //                             value={this.state.categories}
        //                             onChange={this.handleSelect}
        //                             ref={(select) => {this.Categories = select}}
        //                             inputProps={{
        //                             name: 'categories',
        //                             id: 'categories',
        //                         }}
        //                     >
        //                     {categories}
        //                 </Select>
        //                     <FormHelperText>Without label</FormHelperText>
        //                 </FormControl>
        //                 </td>
        //                 <td>
        //                     {/* <Fab type="submit" value="submit" onClick={this.addItem} color="primary" aria-label="add" size="small">
        //                         <AddCircleIcon />
        //                     </Fab> */}
        //                     <Button type="submit" onClick={this.addItem} color="primary">
        //                         Add Item
        //                     </Button>
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
        // );

        let itemAdd = (
            // <form onSubmit={this.addItem}>
                <div>
                    <TextField
                    // error={!this.state.IsUsernameValid}
                    // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                    id="standard-bare"
                    name="Title"
                    inputRef={input => this._Title = input}
                    // value={this.state.item.Title}
                    // onChange={this.handleNewItemChange}
                    // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    />
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
                        id="standard-bare"
                        name="Description"
                        ref={this.Description}
                        // value={this.state.item.Description}
                        // onChange={this.handleNewItemChange}
                        // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
                        type="text"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        id="standard-number"
                        name="Mass"
                        ref={this.Mass}
                        // value={this.state.item.Mass}
                        // onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        id="standard-number"
                        name="CalorieCount"
                        ref={this.CalorieCount}
                        // value={this.state.item.CalorieCount}
                        // onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="standard-number"
                        name="Price"
                        ref={this.Price}
                        // value={this.state.item.Price}
                        // onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        varirant="outlined"
                    />
                    <FormControl>
                        <Select
                                value={this.state.categories}
                                onChange={this.handleSelect}
                                ref={this.Categories}
                                inputProps={{
                                name: 'categories',
                                id: 'categories',
                            }}
                        >
                        {categories}itemAdd
                    </Select>
                    <FormHelperText>Without label</FormHelperText>
                    </FormControl>
                    <Fab onClick={this.addItem} color="primary" aria-label="add" size="small">
                        <AddCircleIcon />
                    </Fab>
                </div>
            // </form>
        )
        
        return (
            <div>
                <ItemList items={this.props.Items} url={this.props.match.url} onClick={ () => this.props.push()}/>
                {itemAdd}
                {ingredients}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Items: state.itemsReducer.Items,
        Categories: state.categoriesReducer.Categories,
        Ingredients: state.ingredientsReducer.Ingredients
    };
}

const mapDispatchToProps = {
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
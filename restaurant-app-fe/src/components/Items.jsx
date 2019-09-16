import React, { Component } from 'react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Route, Link } from 'react-router-dom';

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
import AddItem from './AddItem.jsx';

// import { handleClose, addItem } from '../actions/adminDashboard'
import { fetchItems, fetchCategories, fetchIngredients } from '../actions/adminDashboard'

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

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){

        let csrfToken = "";

        // OLD ONE
        if(this.props.Items !== undefined){
            this.props.Items.forEach(this.initSwitches);
        }

        if(this.props.Ingredients !== undefined){
            this.props.Ingredients.forEach(this.initCheckboxes);
        }

        // fetch(`http://localhost:3000/csrf`, {
        //     method: 'POST',
        //     credentials: 'include'
        //  })
        //  .then(res => res.json())
        //  .then(response => {
        //         csrfToken = response._RequestAntiForgeryToken;
        //  });

        const response = await fetch(`http://localhost:3000/csrf`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
        const json = await response.json();
        this.setState({['csrf_token']: json._RequestAntiForgeryToken, ['items']: this.props.Items, ['categories']: this.props.Categories, ['ingredients']: this.props.Ingredients});


        this.props.fetchCategories();
        this.props.fetchIngredients();
        this.props.fetchItems();
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

    // addItem = (item) => {
    //     this.props.addItem(item);
    // }

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

        console.log('START ITEMS');
        console.log(this.props.Ingredients);
        console.log('END ITEMS');

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

        // let itemAdd = (
        //     // <form onSubmit={this.addItem}>
        //         <div>
        //             <TextField
        //             // error={!this.state.IsUsernameValid}
        //             // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //             id="standard-bare"
        //             name="Title"
        //             inputRef={input => this._Title = input}
        //             // value={this.state.item.Title}
        //             // onChange={this.handleNewItemChange}
        //             // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //             type="text"
        //             margin="normal"
        //             variant="outlined"
        //             />
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 // disabled={!this.getSwitchState(this.state.switches, user.UserID)}
        //                 id="standard-bare"
        //                 name="Description"
        //                 ref={this.Description}
        //                 // value={this.state.item.Description}
        //                 // onChange={this.handleNewItemChange}
        //                 // onChange={(event) => this.handleEditingSwitch(event,  user.UserID)}
        //                 type="text"
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 id="standard-number"
        //                 name="Mass"
        //                 ref={this.Mass}
        //                 // value={this.state.item.Mass}
        //                 // onChange={(event) => this.handleChange(event, index)}
        //                 type="number"
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //             <TextField
        //                 // error={!this.state.IsUsernameValid}
        //                 id="standard-number"
        //                 name="CalorieCount"
        //                 ref={this.CalorieCount}
        //                 // value={this.state.item.CalorieCount}
        //                 // onChange={(event) => this.handleChange(event, index)}
        //                 type="number"
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
        //                 margin="normal"
        //                 variant="outlined"
        //             />
        //             <TextField
        //                 id="standard-number"
        //                 name="Price"
        //                 ref={this.Price}
        //                 // value={this.state.item.Price}
        //                 // onChange={(event) => this.handleChange(event, index)}
        //                 type="number"
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 margin="normal"
        //                 varirant="outlined"
        //             />
        //             <FormControl>
        //                 <Select
        //                         value={this.state.categories}
        //                         onChange={this.handleSelect}
        //                         ref={this.Categories}
        //                         inputProps={{
        //                         name: 'categories',
        //                         id: 'categories',
        //                     }}
        //                 >
        //                 {categories}itemAdd
        //             </Select>
        //             <FormHelperText>Without label</FormHelperText>
        //             </FormControl>
        //             <Fab onClick={this.addItem} color="primary" aria-label="add" size="small">
        //                 <AddCircleIcon />
        //             </Fab>
        //         </div>
        //     // </form>
        // )

        const {
            IsFetchingIngredients,
            IsFetchingItems,
            IsFetchingCategories
        } = this.props;

        if(IsFetchingItems && IsFetchingCategories && IsFetchingIngredients){
            return <div>Loading</div>;
        }

        console.log('START ITEMS X')
        console.log(this.props.Ingredients);
        console.log('END ITEMS X')
        
        
        console.log('START ITEMS F')
        console.log(this.props.Categories);
        console.log('END ITEMS F')

        return (
            <div>
                <ItemList items={this.props.Items} categories={this.props.Categories} ingredients={this.props.Ingredients} csrf={this.state.csrf_token} match={this.props.match}/>
                <AddItem categoryPass={this.props.Categories} addItem={(item) => this.addItem(item)} Open={this.props.Open} IsSuccessful={this.props.IsSuccessful} Message={this.props.Message} handleClose={this.props.handleClose} csrf={this.state.csrf_token} ingredientsPass={this.props.Ingredients}/>
                {/* {itemAdd} */}
                {/* {ingredients} */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Categories: state.categoriesReducer.Categories,
        Open: state.itemsReducer.Open,
        IsSuccessful: state.itemsReducer.IsSuccessful,
        Message: state.itemsReducer.Message,
        IsFetchingItems: state.itemsReducer.IsFetchingItems,
        Items: state.itemsReducer.Items,
        IsFetchingCategories: state.categoriesReducer.IsFetchingCategories,
        Categories: state.categoriesReducer.Categories,
        IsFetchingIngredients: state.ingredientsReducer.IsFetchingIngredients,
        Ingredients: state.ingredientsReducer.Ingredients,
    };
}

const mapDispatchToProps = {
    push,
    fetchItems, 
    fetchCategories, 
    fetchIngredients
    // addItem,
    // handleClose
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
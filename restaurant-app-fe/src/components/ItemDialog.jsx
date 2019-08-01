import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAllergies, faCheck } from '@fortawesome/free-solid-svg-icons'
import defaultImg from '../assets/images/default.png';



export default class ItemDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        checkboxes: [],
        size: '',
        price: 0,
        isDisabled: true,
        personalPreference: '',
        amount: 1
    };

    this.getCheckboxState = this.getCheckboxState.bind(this);
    this.handleIngredientCheck = this.handleIngredientCheck.bind(this);
  }

  componentDidMount = () => {
    this.props.object[0].Ingredient.forEach(this.initCheckBoxes);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleAmountChange = event => {
    let price = this.props.object[0].Item.Price * this.getPriceMultiplier(this.state.size);
    let name = event.target.name;
    let amount = event.target.value;

    if(price > 0) {
      if(amount > 0){
        price *= amount;
      }
      else {
        price = 0;
      }
    }
    this.setState({[name]: amount, ['price']: price});
  }

  handleClose = () => {
      this.props.handleClose();
  }


  addToCart = () => {
    this.props.addToCart(1, {
      title: this.props.object[0].Item.Title,
      size: this.state.size,
      price: this.state.price,
      personalPreference: this.state.personalPreference,
      amount: this.state.amount
    });
  }


  getPriceMultiplier = (size) => {
    let portions = this.props.object[0].Portion;

    for(var i=0; i < portions.length;i++){
      if(portions[i].SizeName == size){
        return portions[i].PriceMultiplier;
      }
    }

    return 0;
  }

  calculatePrice = (size) => {
    let price = 0;
    price = this.props.object[0].Item.Price * this.getPriceMultiplier(size);
    
    if(this.state.amount > 0){
      price *= this.state.amount;
    }

    return price;
  }

  handleSelect = event => {
    let price = 0;
    price = this.state.amount == 0 ? 0 : this.calculatePrice(event.target.value)
    this.setState({[event.target.name]: event.target.value, ['price']: price, ['isDisabled']: false});
  }

  initCheckBoxes = (ingredient) => {
    let checkbox = {
      key: ingredient.IngredientID,
      value: false
    }

    if(ingredient.IsBase == 1){
      checkbox.value = true;
    }

    let temp = this.state.checkboxes;
    temp.push(checkbox);
    this.setState({['checkboxes']: temp})
  }

  getCheckboxState(key){
    this.state.checkboxes.filter(function(checkbox){
      if(checkbox.key == key){
        return checkbox.value;
      }
    });
    return false;
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

  IsBase = (index) => {
    return this.props.object[0].Ingredient[index].IsBase == 1 ? true : false;
  }

  IsChecked = (checkboxes, ingredientID) => {
    for(var i=0; i < checkboxes.length; i++){
      if(checkboxes[i].key == ingredientID){
        return checkboxes[i].value;
      }
    }
    return false;
  }

  render(){
    let ingredients = this.props.object[0].Ingredient.map((obj, index) => 
                                        <FormControlLabel
                                          key={index}
                                          control={
                                            <Checkbox
                                              key={obj.IngredientID}
                                              disabled={this.IsBase(index)}
                                              checked={this.IsChecked(this.state.checkboxes, obj.IngredientID)}
                                              onChange={(event) => this.handleIngredientCheck(event,  obj.IngredientID)} 
                                              value={obj.Title} />
                                          }
                                          label={obj.Title}
                                        />
    );

    // let ingredientsWithAllergens = this.props.object[0].Ingredient.filter(ingredient => ingredient.Allergens !== "");
    let allergens = this.props.object[0].Ingredient.map(function(ingredient){
        if(ingredient.Allergens !== ""){
          return ingredient.Allergens;
        }
    });

    let img = <img id='default' alt="default" src={defaultImg} height='75px' width='75px'></img>

    let portion = this.props.object[0].Portion.map((portion, index) => 
                                          <MenuItem key={index} value={portion.SizeName}>{portion.SizeName}</MenuItem>
    );

    return (
        <div>
          <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.object[0].Item.Title}</DialogTitle>
                    <DialogContent>
                    {this.props.open ? img : null}
                    {ingredients}
                    {allergens.length > 1 ? <div><FontAwesomeIcon icon={faAllergies} />{allergens}</div> : <div><FontAwesomeIcon icon={faCheck} />No allergens :)</div>}
                    <FormControl>
                      <InputLabel htmlFor="portion-size">Portion size</InputLabel>
                      <Select
                        value={this.state.size}
                        onChange={this.handleSelect}
                        inputProps={{
                          name: 'size',
                          id: 'size',
                        }}
                      >
                        {portion}
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Personal preference"
                      name="personalPreference"
                      multiline
                      rowsMax="4"
                      value={this.state.personalPreference}
                      onChange={this.handleChange}
                      margin="normal"
                      helperText="No onion, no cabbage, more chicken :)"
                      variant="outlined"
                    />
                    <TextField
                      id="standard-number"
                      label="Amount"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.handleAmountChange}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <p>{this.state.price}</p>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Done
                    </Button>
                    <Button onClick={this.addToCart} disabled={this.state.isDisabled} color="primary">
                        Add to cart
                    </Button>
                    </DialogActions>
          </Dialog>
        </div>
      );
  }
}
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
        price: this.props.Item.Price,
        total_price: 0,
        isDisabled: true,
        personalPreference: '',
        amount: 1
    };

    // this.getCheckboxState = this.getCheckboxState.bind(this);
    this.handleIngredientCheck = this.handleIngredientCheck.bind(this);
  }

  componentDidMount = () => {
    // FIXME: fix this ugly menace
    this.props.Item.Ingredients.forEach(this.initCheckBoxes);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleAmountChange = event => {
    // FIXME: fix this ugly menace
    let price = this.props.Item.Price * this.getPriceMultiplier(this.state.size);
    let name = event.target.name;
    let amount = event.target.value;
    let total_price = price;

    if(total_price > 0) {
      if(amount > 0){
        total_price *= amount;
      }
      else {
        total_price = 0;
      }
    }
    this.setState({[name]: amount, ['total_price']: total_price, ['price']: price});
  }

  handleClose = () => {
      this.props.handleClose();
  }


  addToCart = () => {
    console.log('PRICE: ' + this.state.price);
    this.props.addToCart({
      // FIXME: fix this ugly menace
      ItemID: this.props.Item.ItemID,
      Title: this.props.Item.Title,
      Size: this.state.size,
      Price: this.state.price,
      TotalPrice: this.state.total_price,
      PersonalPreference: this.state.personalPreference,
      Amount: parseInt(this.state.amount)
    });
  }


  getPriceMultiplier = (size) => {
    // FIXME: fix this ugly menace
    let portions = this.props.Item.Category.Portions;

    for(var i=0; i < portions.length;i++){
      if(portions[i].SizeName == size){
        return portions[i].PriceMultiplier;
      }
    }

    return 0;
  }

  calculatePrice = (size) => {
    let price = 0;
    price = this.props.Item.Price * this.getPriceMultiplier(size);
    
    if(this.state.amount > 0){
      price *= this.state.amount;
    }

    return price;
  }

  handleSelect = event => {
    let price = 0;
    price = this.state.amount == 0 ? 0 : this.calculatePrice(event.target.value)
    this.setState({[event.target.name]: event.target.value, ['total_price']: price, ['isDisabled']: false});
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

  // getCheckboxState(key){
  //   this.state.checkboxes.filter(function(checkbox){
  //     if(checkbox.key == key){
  //       return checkbox.value;
  //     }
  //   });
  //   return false;
  // }

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
    // FIXME: fix this ugly menace
    return this.props.Item.Ingredients[index].IsBase == 1 ? true : false;
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
    // FIXME: fix this ugly menace
    let ingredients = this.props.Item.Ingredients.map((ingredient, index) => 
                                        <FormControlLabel
                                          key={index}
                                          control={
                                            <Checkbox
                                              key={ingredient.IngredientID}
                                              disabled={this.IsBase(index)}
                                              checked={this.IsChecked(this.state.checkboxes, ingredient.IngredientID)}
                                              onChange={(event) => this.handleIngredientCheck(event,  ingredient.IngredientID)} 
                                              value={ingredient.Title} />
                                          }
                                          label={ingredient.Title}
                                        />
    );

    // FIXME: fix this ugly menace
    let allergens = this.props.Item.Ingredients.map(function(ingredient){
        if(ingredient.Allergens !== ""){
          return ingredient.Allergens;
        }
    });

    let img = <img id='default' alt="default" src={defaultImg} height='75px' width='75px'></img>

    // FIXME: fix this ugly menace
    let portion = this.props.Item.Category.Portions.map((portion, index) => 
                                          <MenuItem key={index} value={portion.SizeName}>{portion.SizeName}</MenuItem>
    );

    //FIXME: fix this ugly menace
    return (
        <div>
          <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.Item.Title}</DialogTitle>
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
                    <p>{this.state.total_price}</p>
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
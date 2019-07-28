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
    // let arrayOfIngredients = [];
    this.state = {
        checkboxes: [],
        size: '',
        price: 0,
        isDisabled: true
    };

    this.getCheckboxState = this.getCheckboxState.bind(this);
    this.handleIngredientCheck = this.handleIngredientCheck.bind(this);
  }

  componentDidMount = () => {
    this.props.object[0].Ingredient.forEach(this.initCheckBoxes);
  }

  // handleClickOpen = () => {
  //     this.setState({['open']: true});
  // }

  handleClose = () => {
      this.props.handleClose();
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
    return this.props.object[0].Item.Price * this.getPriceMultiplier(size);
  }

  handleSelect = event => {
    this.setState({[event.target.name]: event.target.value, ['price']: this.calculatePrice(event.target.value), ['isDisabled']: false});
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
                    {allergens !== undefined ? <div><FontAwesomeIcon icon={faAllergies} />{allergens}</div> : <div><FontAwesomeIcon icon={faCheck} />No allergens :)</div>}
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
                    <p>{this.state.price}</p>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} disabled={this.state.isDisabled} color="primary">
                        Add to cart
                    </Button>
                    </DialogActions>
          </Dialog>
        </div>
      );
  }
}
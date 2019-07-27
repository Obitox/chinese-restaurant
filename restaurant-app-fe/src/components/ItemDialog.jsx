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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAllergies, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class ItemDialog extends React.Component {
  constructor(props){
    super(props);
    // let arrayOfIngredients = [];
    this.state = {
        checkboxes: []
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

  initCheckBoxes = (ingredient) => {
    let checkbox = {
      key: ingredient.IngredientID,
      value: false
    };
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

  render(){
    let ingredients = this.props.object[0].Ingredient.map((obj, index) => 
                                        <FormControlLabel
                                          key={index}
                                          control={
                                            <Checkbox
                                              key={obj.IngredientID}
                                              checked={this.state.checkboxes.filter(checkbox => checkbox.key == obj.IngredientID).value} 
                                              onChange={(event) => this.handleIngredientCheck(event,  obj.IngredientID)} 
                                              value={obj.Title} />
                                          }
                                          label={obj.Title}
                                        />
    );

    let ingredientsWithAllergens = this.props.object[0].Ingredient.filter(ingredient => ingredient.Allergens !== "");
    let allergens;
    if(ingredientsWithAllergens.length > 0){
      allergens = ingredientsWithAllergens.map(ingredient => ingredient.Allergens);
    }
    console.log("Allergens: " + allergens)
    return (
        <div>
          <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.object[0].Item.Title}</DialogTitle>
                    <DialogContent>
                    {ingredients}
                    {allergens !== undefined ? <div><FontAwesomeIcon icon={faAllergies} />{allergens}</div> : <div><FontAwesomeIcon icon={faCheck} />No allergens :)</div>}
                    <DialogContentText>
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
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
                    </Button>
                    </DialogActions>
          </Dialog>
        </div>
      );
  }
}
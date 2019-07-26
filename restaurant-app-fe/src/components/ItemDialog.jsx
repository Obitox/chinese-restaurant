import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ItemDialog extends React.Component {
//   const [open, setOpen] = React.useState(false);

  constructor(props){
    super(props);
    // let arrayOfIngredients = [];
    this.state = {
        
    };
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
    console.log('ID: ' + ingredient.IngredientID)
    this.setState({[ingredient.IngredientID]: false});
    console.log(this.state);
  }

  // handleIngredientCheck = (obj) => {
  //     this.setState({['ingredients']: })
  // }

//   function handleClickOpen() {
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

  render(){
    // let ingredients = this.props.object[0].Ingredient.map((obj, key) => 
    //             <Checkbox
    //               key={obj.IngredientID}
    //               checked={obj.checked}
    //               onLoad={() => this.initCheckboxes(oj)}
    //               onChange={() => this.handleIngredientCheck(obj)}
    //               value="checkedA"
    //               inputProps={{
    //                 'aria-label': 'primary checkbox',
    //               }}
    //           />
    // );

    return (
        <div>
          <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.object[0].Item.Title}</DialogTitle>
                    <DialogContent>
                    
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
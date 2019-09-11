import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import '../assets/scss/addItem.scss';

import { handleClose, addItem } from '../actions/adminDashboard'

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

class AddItem extends Component {
    constructor(props){
        super(props);

        let ingredientTitleArray = [
        ];

        for(var i=0;i<props.Ingredients.length;i++){
            ingredientTitleArray.push(props.Ingredients[i].Title);
        }

        this.state = {
            ingredientTitles: ingredientTitleArray,
            ingredientTitle: [],
            ingredients: props.Ingredients,
            categories: props.Categories,
            category: ''
            // csrf_token: ''
        };
    }

    componentDidMount = () => {
        // FIXME: separate this request to action
        // fetch(`http://localhost:3000/csrf`, {
        //     method: 'POST',
        //     credentials: 'include'
        //  })
        //  .then(res => res.json())
        //  .then(response => {
        //     this.setState({
        //         csrf_token: response._RequestAntiForgeryToken
        //     });
        // });
    }

    addItem = (e) => {
        e.preventDefault();
        // console.log( {Item: {
        //     Title: this._Title.value,
        //     Description: this._Description.value,
        //     Mass: parseInt(this._Mass.value),
        //     CalorieCount: parseInt(this._CalorieCount.value),
        //     Price: parseInt(this._Price.value),
        //     Category: this.state.categories.find(category => category.Title == this.state.category)
        // },
        // Ingredients: this.state.ingredientTitle});
        let allIngredients = this.state.ingredients;
        let ingredientTitle = this.state.ingredientTitle;
        let ingredients = [];
        for(var i =0; i < allIngredients.length; i++){
            for(var j =0; j < ingredientTitle.length; j++){
                if(allIngredients[i].Title == ingredientTitle[j]){
                    ingredients.push(allIngredients[i]);
                }
            }
        }

        this.props.addItem({
                Title: this._Title.value,
                Description: this._Description.value,
                Mass: parseInt(this._Mass.value),
                CalorieCount: parseInt(this._CalorieCount.value),
                Price: parseInt(this._Price.value),
                Category: this.state.categories.find(category => category.Title == this.state.category),
                Ingredients: ingredients,
                RequestAntiForgeryToken: this.props.csrf
            });
    }
    
    handleChange = (e) => {
        this.setState({
            ingredientTitle: e.target.value
        });
    }

    handleSelectChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="add-item-container">
                <form className="add-item-form" onSubmit={this.addItem}>
                        <TextField
                            // error={!this.state.IsUsernameValid}
                            // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                            id="outlined-name"
                            label="Title"
                            name="Title"
                            // defaultValue={item.Title}
                            inputRef={input => this._Title = input}
                            // onChange={(event) => this.handleChange(event, index)}
                            // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                            
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            // error={!this.state.IsUsernameValid}
                            // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                            id="outlined-name"
                            label="Description"
                            name="Description"
                            // defaultValue={item.Description}
                            inputRef={input => this._Description = input}
                            // onChange={(event) => this.handleChange(event, index)}
                            // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                            margin="normal"
                            variant="outlined"
                        />    
                        <TextField
                            // error={!this.state.IsUsernameValid}
                            // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                            id="outlined-number"
                            label="Mass"
                            name="Mass"
                            // defaultValue={item.Mass}
                            inputRef={input => this._Mass = input}
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
                            // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                            id="outlined-number"
                            label="Calorie count"
                            name="CalorieCount"
                            // defaultValue={item.CalorieCount}
                            inputRef={input => this._CalorieCount = input}
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
                            // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                            id="outlined-number"
                            label="Price"
                            name="Price"
                            // defaultValue={item.Price}
                            inputRef={input => this._Price = input}
                            // onChange={(event) => this.handleChange(event, index)}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            varirant="outlined"
                        />
                        <FormControl>
                            <InputLabel shrink htmlFor="categories">Category</InputLabel>
                            <Select
                                value={this.state.category}
                                onChange={this.handleSelectChange}
                                inputProps={{
                                    name: 'category',
                                    id: 'categories',
                                }}
                            >
                                {
                                    this.state.categories.map((category, index) => 
                                            <MenuItem key={index} value={category.Title}>{category.Title}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel shrink htmlFor="select-multiple-checkbox">Ingredients</InputLabel>
                            <Select
                                multiple
                                value={this.state.ingredientTitle}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                // MenuProps={MenuProps}
                            >
                                {this.state.ingredientTitles.map(title => (
                                        <MenuItem key={title} value={title}>
                                            <Checkbox checked={this.state.ingredientTitle.indexOf(title) > -1} />
                                            <ListItemText primary={title} />
                                        </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" color="primary">
                            Add Item
                        </Button>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={this.props.Open}
                            autoHideDuration={6000}
                            onClose={this.props.handleClose}
                        >
                            <MySnackbarContentWrapper
                                onClose={this.props.handleClose}
                                variant={this.props.IsSuccessful ? 'success': 'error'}
                                message={this.props.Message}
                            />
                        </Snackbar>
                        {/* <Snackbar
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={this.props.Open}
                            autoHideDuration={6000}
                            onClose={this.props.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.props.Message}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    // className={classes.close}
                                    onClick={this.props.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        /> */}
                        {/* <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            key={`topcenter`}
                            open={this.props.IsSuccessful}
                            onClose={this.props.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.props.Message}</span>}
                        /> */}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // Items: state.itemsReducer.Items,
    // Item: state.itemsReducer.Item,
    // Open: state.itemsReducer.Open,
    // IsSuccessful: state.itemsReducer.IsSuccessful,
    // Message: state.itemsReducer.Message
    Open: state.itemsReducer.Open,
    IsSuccessful: state.itemsReducer.IsSuccessful,
    Message: state.itemsReducer.Message
})

const mapDispatchToProps = {
    // push
    // openItemDialog,
    // closeItemDialog
    // push,
    addItem,
    handleClose
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
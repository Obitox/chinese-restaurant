import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import '../assets/scss/cart.scss';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { handleToastClose, removeItemFromCart, incrementCartItemAmount, decrementCartItemAmount } from '../actions/home.js'


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

class CartDialog extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {
        let isAuth = localStorage.getItem('IsAuthenticated');
        if(isAuth !== "true"){
            let path = `/login`
            this.props.push(path);
        }
    }

    handleCartClose = () => {
        this.props.handleCartClose();
    }

    checkoutCart = () => {
        this.props.checkoutCart();
    }

    removeItemFromCart = (itemID, size) => {
        this.props.removeItemFromCart(itemID, size);
    }

    incrementCartItemAmount = (itemID, totalPrice, pricePerItem, size) => {
        let newTotalPrice = totalPrice + pricePerItem;
        this.props.incrementCartItemAmount(itemID, newTotalPrice, size);
    }

    decrementCartItemAmount = (itemID, totalPrice, pricePerItem, size) => {
        let newTotalPrice = totalPrice - pricePerItem;
        this.props.decrementCartItemAmount(itemID, newTotalPrice, size);
    }

    render() {
        let cartItems = null
        if(this.props.Cart.length > 0){
            cartItems = this.props.Cart.map((cartItem, index) => 
                <p key={index}>Title: {cartItem.Title} Size: {cartItem.Size} Amount: {cartItem.Amount} PersonalPreference: {cartItem.PersonalPreference} Price: {cartItem.TotalPrice}<FontAwesomeIcon className="icon-minus" onClick={() => this.decrementCartItemAmount(cartItem.ItemID, cartItem.TotalPrice, cartItem.Price, cartItem.Size)} icon={faMinus} /><FontAwesomeIcon className="icon-plus" onClick={() => this.incrementCartItemAmount(cartItem.ItemID, cartItem.TotalPrice, cartItem.Price, cartItem.Size)} icon={faPlus} /><FontAwesomeIcon onClick={() => this.removeItemFromCart(cartItem.ItemID, cartItem.Size)} icon={faTimes} /></p>
            );
        }

        // let cartItems = this.props.Cart.map((cartItem, index) => 
        // <p key={index}>Title: {cartItem.Title} Size: {cartItem.Size} Amount: {cartItem.Amount} PersonalPreference: {cartItem.PersonalPreference} Price: {cartItem.Price}<FontAwesomeIcon onClick={() => this.decrementCartItemAmount(cartItem.ItemID)} icon={faMinus} /><FontAwesomeIcon onClick={() => this.incrementCartItemAmount(cartItem.ItemID)} icon={faPlus} /><FontAwesomeIcon onClick={() => this.removeItemFromCart(cartItem.ItemID)} icon={faTimes} /></p>
        // );

        console.log(this.props.IsSuccessful);

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleCartClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Your cart</DialogTitle>
                    <DialogContent>
                    {cartItems}
                    {/* {this.props.open ? img : null}
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
                    <p>{this.state.price}</p> */}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCartClose} color="primary">
                        Done
                    </Button>
                    <Button onClick={this.checkoutCart} disabled={this.state.isDisabled} color="primary">
                        Checkout cart
                    </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.props.Open}
                    autoHideDuration={6000}
                    onClose={this.props.handleToastClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.props.handleToastClose}
                        variant={this.props.IsSuccessful == true ? 'success': 'error'}
                        message={this.props.Message}
                    />
                </Snackbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Username: state.homeReducer.Username,
        // IsAuthenticated: state.homeReducer.IsAuthenticated,
        Cart: state.homeReducer.Cart,
        Open: state.homeReducer.Open,
        Message: state.homeReducer.Message,
        IsSuccessful: state.homeReducer.IsSuccessful
    };
}

const mapDispatchToProps = {
    // tryLoadDataFromLocalStroage,
    // logoutAction,
    // fetchItems,
    removeItemFromCart,
    incrementCartItemAmount,
    decrementCartItemAmount,
    handleToastClose,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDialog)
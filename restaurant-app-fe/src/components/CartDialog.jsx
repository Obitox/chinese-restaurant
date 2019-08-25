import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { removeItemFromCart, incrementCartItemAmount, decrementCartItemAmount } from '../actions/home.js'

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
            console.log(this.props.Cart);
            cartItems = this.props.Cart.map((cartItem, index) => 
            <p key={index}>Title: {cartItem.Title} Size: {cartItem.Size} Amount: {cartItem.Amount} PersonalPreference: {cartItem.PersonalPreference} Price: {cartItem.TotalPrice} PRICEPER: {cartItem.Price}<FontAwesomeIcon onClick={() => this.decrementCartItemAmount(cartItem.ItemID, cartItem.TotalPrice, cartItem.Price, cartItem.Size)} icon={faMinus} /><FontAwesomeIcon onClick={() => this.incrementCartItemAmount(cartItem.ItemID, cartItem.TotalPrice, cartItem.Price, cartItem.Size)} icon={faPlus} /><FontAwesomeIcon onClick={() => this.removeItemFromCart(cartItem.ItemID, cartItem.Size)} icon={faTimes} /></p>
            );
        }

        // let cartItems = this.props.Cart.map((cartItem, index) => 
        // <p key={index}>Title: {cartItem.Title} Size: {cartItem.Size} Amount: {cartItem.Amount} PersonalPreference: {cartItem.PersonalPreference} Price: {cartItem.Price}<FontAwesomeIcon onClick={() => this.decrementCartItemAmount(cartItem.ItemID)} icon={faMinus} /><FontAwesomeIcon onClick={() => this.incrementCartItemAmount(cartItem.ItemID)} icon={faPlus} /><FontAwesomeIcon onClick={() => this.removeItemFromCart(cartItem.ItemID)} icon={faTimes} /></p>
        // );

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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Username: state.homeReducer.Username,
        // IsAuthenticated: state.homeReducer.IsAuthenticated,
        Cart: state.homeReducer.Cart
    };
}

const mapDispatchToProps = {
    // tryLoadDataFromLocalStroage,
    // logoutAction,
    // fetchItems,
    removeItemFromCart,
    incrementCartItemAmount,
    decrementCartItemAmount,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDialog)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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

    render() {
        let cartItems = this.props.cart.map((cartItem, index) => 
                                <p key={index}>Title: {cartItem.title} Size: {cartItem.size} Amount: {cartItem.amount} PersonalPreference: {cartItem.personalPreference} Price: {cartItem.price}</p>
        );

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
        // Data: state.homeReducer.Data
    };
}

const mapDispatchToProps = {
    // tryLoadDataFromLocalStroage,
    // logoutAction,
    // fetchItems,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDialog)
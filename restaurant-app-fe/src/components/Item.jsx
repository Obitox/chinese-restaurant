// import React from 'react'

import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import FormHelperText from '@material-ui/core/FormHelperText'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import { connect } from 'react-redux'

// import React from 'react'
import PropTypes from 'prop-types'

class Item extends Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log('rendered');
        // console.log(this.props);
        // console.log(item);
        const {item, open, handleClose}  = this.props;
        
        // console.log(item.Title);
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{item.Title}</DialogTitle>
                <DialogContent>
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        id="standard-bare"
                        name="ItemID"
                        defaultValue={item.ItemID}
                        inputRef={input => this._ItemID = input}
                        // onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-bare"
                        name="Title"
                        defaultValue={item.Title}
                        inputRef={input => this._Title = input}
                        // onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-bare"
                        name="Description"
                        defaultValue={item.Description}
                        inputRef={input => this._Description = input}
                        // onChange={(event) => this.handleChange(event, index)}
                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                        margin="normal"
                        variant="outlined"
                    />    
                    <TextField
                        // error={!this.state.IsUsernameValid}
                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                        id="standard-number"
                        name="Mass"
                        defaultValue={item.Mass}
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
                        id="standard-number"
                        name="CalorieCount"
                        defaultValue={item.CalorieCount}
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
                        id="standard-number"
                        name="Price"
                        defaultValue={item.Price}
                        inputRef={input => this._Price = input}
                        // onChange={(event) => this.handleChange(event, index)}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        varirant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Done
                    </Button>
                    <Fab 
                    // disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.updateUser(this.state.users[index])} color="primary" aria-label="save" size="small"
                    >
                        <SaveIcon />
                    </Fab>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        key={`topcenter`}
                        open={this.props.IsSuccessful}
                        onClose={this.props.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.props.Message}</span>}
                    />
                {/* <Button onClick={this.checkoutCart} disabled={this.state.isDisabled} color="primary">
                    Checkout cart
                </Button> */}
                </DialogActions>
            </Dialog>
        )

        // return (
        //     <div className="item">
                
        //     </div>
        // )
    }
}

const mapStateToProps = (state) => {
    return {
        // Items: state.itemsReducer.Items,
        // Categories: state.categoriesReducer.Categories,
        // Ingredients: state.ingredientsReducer.Ingredients
    };
}

const mapDispatchToProps = {
    // push
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)



// export default function Item(props) {
//     console.log(props);
//     console.log(item);
    // return (
    //     <div className="item">
    //         <TextField
    //             // error={!this.state.IsUsernameValid}
    //             id="standard-bare"
    //             name="ItemID"
    //             value={item.ItemID}
    //             // onChange={(event) => this.handleChange(event, index)}
    //             // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
    //             margin="normal"
    //             variant="outlined"
    //         />
    //         <TextField
    //             // error={!this.state.IsUsernameValid}
    //             // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
    //             id="standard-bare"
    //             name="Title"
    //             value={item.Title}
    //             // onChange={(event) => this.handleChange(event, index)}
    //             // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                
    //             margin="normal"
    //             variant="outlined"
    //         />
    //         <TextField
    //             // error={!this.state.IsUsernameValid}
    //             // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
    //             id="standard-bare"
    //             name="Description"
    //             value={item.Description}
    //             // onChange={(event) => this.handleChange(event, index)}
    //             // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
    //             margin="normal"
    //             variant="outlined"
    //         />    
    //         <TextField
    //             // error={!this.state.IsUsernameValid}
    //             // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
    //             id="standard-number"
    //             name="Mass"
    //             value={item.Mass}
    //             // onChange={(event) => this.handleChange(event, index)}
    //             type="number"
    //             // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
    //             InputLabelProps={{
    //                 shrink: true,
    //             }}
    //             margin="normal"
    //             variant="outlined"
    //         />
    //         <TextField
    //             // error={!this.state.IsUsernameValid}
    //             // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
    //             id="standard-number"
    //             name="CalorieCount"
    //             value={item.CalorieCount}
    //             // onChange={(event) => this.handleChange(event, index)}
    //             type="number"
    //             InputLabelProps={{
    //                 shrink: true,
    //             }}
    //             // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
    //             margin="normal"
    //             variant="outlined"
    //         />
    //         <TextField
    //             // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
    //             id="standard-number"
    //             name="Price"
    //             value={item.Price}
    //             // onChange={(event) => this.handleChange(event, index)}
    //             type="number"
    //             InputLabelProps={{
    //                 shrink: true,
    //             }}
    //             margin="normal"
    //             varirant="outlined"
    //         />
    //         <Fab onClick={() => this.props.onClick(item.ItemID)} color="primary" aria-label="edit" size="small">
    //             <EditIcon />
    //         </Fab>
    //         <Snackbar
    //             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //             key={`topcenter`}
    //             open={this.props.IsSuccessful}
    //             onClose={() => this.props.handleClose()}
    //             ContentProps={{
    //                 'aria-describedby': 'message-id',
    //             }}
    //             message={<span id="message-id">{this.props.Message}</span>}
    //         />
    //     </div>
//     )
// }
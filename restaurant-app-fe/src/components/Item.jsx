import React from 'react'

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import FormHelperText from '@material-ui/core/FormHelperText'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';


export default function Item(props) {
    console.log(props.passedItem);
    return (
        <div className="item">
            <TextField
                // error={!this.state.IsUsernameValid}
                id="standard-bare"
                name="ItemID"
                value={props.passedItem.ItemID}
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
                value={props.passedItem.Title}
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
                value={props.passedItem.Description}
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
                value={props.passedItem.Mass}
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
                value={props.passedItem.CalorieCount}
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
                value={props.passedItem.Price}
                // onChange={(event) => this.handleChange(event, index)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                varirant="outlined"
            />
            <Fab onClick={() => props.onClick(item.ItemID)} color="primary" aria-label="edit" size="small">
                <EditIcon />
            </Fab>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                key={`topcenter`}
                open={props.IsSuccessful}
                onClose={() => props.handleClose()}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{props.Message}</span>}
            />
        </div>
    )
}
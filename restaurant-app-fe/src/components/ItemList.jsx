import { Route, Link } from 'react-router-dom';

import Item from './Item.jsx';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import React, { Component } from 'react'

export default class ItemList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="item-list">
                <table>
                    <thead>
                        <tr>
                            <th>
                                ItemID
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Mass
                            </th>
                            <th>
                                Calorie count
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        id="standard-bare"
                                        name="ItemID"
                                        value={item.ItemID}
                                        // inputRef={input => this._ItemID = input}
                                        // onChange={(event) => this.handleChange(event, index)}
                                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                                        id="standard-bare"
                                        name="Title"
                                        value={item.Title}
                                        // inputRef={input => this._Title = input}
                                        // onChange={(event) => this.handleChange(event, index)}
                                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                        
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                                        id="standard-bare"
                                        name="Description"
                                        // inputRef={input => this._Description = input}
                                        value={item.Description}
                                        // onChange={(event) => this.handleChange(event, index)}
                                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                                        id="standard-number"
                                        name="Mass"
                                        value={item.Mass}
                                        // inputRef={input => this._Mass = input}
                                        // onChange={(event) => this.handleChange(event, index)}
                                        type="number"
                                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // error={!this.state.IsUsernameValid}
                                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                                        id="standard-number"
                                        name="CalorieCount"
                                        value={item.CalorieCount}
                                        // inputRef={input => this._CalorieCount = input}
                                        // onChange={(event) => this.handleChange(event, index)}
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        // disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
                                        id="standard-number"
                                        name="Price"
                                        value={item.Price}
                                        // inputRef={input => this._Price = input}
                                        // onChange={(event) => this.handleChange(event, index)}
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        varirant="outlined"
                                    />
                                </td>
                                <td>
                                    {/* <Link to={{
                                        pathname: `${this.props.match.url}/${item.ItemID}`,
                                        state: {
                                            item: item
                                        }
                                    }}>
                                        <Fab color="primary" aria-label="edit" size="small">
                                            <EditIcon />
                                        </Fab>
                                    </Link> */}
                                    <Fab onClick={() => {
                                        this.props.onClick(item.ItemID);
                                        // event.preventDefault();
                                        // console.log(this._Title.value);
                                    }} color="primary" aria-label="edit" size="small">
                                        <EditIcon />
                                    </Fab>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}



// export default function ItemList(props) {
//     console.log(props.items);
    
// }


// export class ItemList extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             csrf_token: '',
//             items: [],
//             switches: []
//         }

//         this.componentDidMount = this.componentDidMount.bind(this);
//     }

//     async componentDidMount(){
//         if(this.props.Items !== undefined){
//             this.props.Items.forEach(this.initSwitches);
//         }

//         if(this.props.Ingredients !== undefined){
//             this.props.Ingredients.forEach(this.initCheckboxes);
//         }

//         const response = await fetch(`http://localhost:3000/csrf`, {
//                                     method: 'POST',
//                                     credentials: 'include'
//                                 });
//         const json = await response.json();
//         this.setState({['csrf_token']: json._RequestAntiForgeryToken, ['items']: this.props.Items});
//     }

//     initSwitches = (item) => {
//         let itemSwitch = {
//             key: item.ItemID,
//             value: false
//         }

//         this.setState(prevState => ({
//             switches: [...prevState.switches, itemSwitch]
//         }))
//     }

//     handleChange = (event, index) => {
//         let name = event.target.name;
//         let value = event.target.value;
//         let items = this.state.items;

//         items[index][name] = value;
//         this.setState({['items']: items});
//     }

//     getSwitchState(switches, key){
//         for(var i=0; i < switches.length; i++){
//             if(switches[i].key == key){
//               return switches[i].value;
//             }
//           }
//         return false;
//     }

//     // FIXME: Find a better way
//     handleEditingSwitch(event, key){
//         let switches = this.state.switches;
//         let updatedSwitches = [];
//         for(var i =0; i < switches.length; i++){
//             if(switches[i].key == key){
//                 switches[i].value = event.target.checked;
//             }
//             updatedSwitches.push(switches[i]);
//         }
//         this.setState({['switches']: updatedSwitches})
//     }

//     render() {

//         let items = this.state.items !== undefined ? this.state.items.map((item, index) => 
//         <tr key={index}>
//             <td>
//                 <TextField
//                     // error={!this.state.IsUsernameValid}
//                     disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
//                     id="standard-bare"
//                     name="ItemID"
//                     value={item.ItemID}
//                     onChange={(event) => this.handleChange(event, index)}
//                     // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
//                     margin="normal"
//                     variant="outlined"
//                 />
//             </td>
//             <td>
//                 <TextField
//                     // error={!this.state.IsUsernameValid}
//                     disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
//                     id="standard-bare"
//                     name="Title"
//                     value={item.Title}
//                     onChange={(event) => this.handleChange(event, index)}
//                     // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
//                     margin="normal"
//                     variant="outlined"
//                 />
//             </td>
//             <td>
//                 <TextField
//                     // error={!this.state.IsUsernameValid}
//                     disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
//                     id="standard-bare"
//                     name="Description"
//                     value={item.Description}
//                     onChange={(event) => this.handleChange(event, index)}
//                     // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
//                     margin="normal"
//                     variant="outlined"
//                 />
//             </td>
//             <td>
//                 <TextField
//                     // error={!this.state.IsUsernameValid}
//                     disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
//                     id="standard-number"
//                     name="Mass"
//                     value={item.Mass}
//                     onChange={(event) => this.handleChange(event, index)}
//                     type="number"
//                     // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     margin="normal"
//                     variant="outlined"
//                 />
//             </td>
//             <td>
//                 <TextField
//                     // error={!this.state.IsUsernameValid}
//                     disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
//                     id="standard-number"
//                     name="CalorieCount"
//                     value={item.CalorieCount}
//                     onChange={(event) => this.handleChange(event, index)}
//                     type="number"
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     // onChange={(event) => this.handleEditingSwitch(event,  item.ItemID)}
//                     margin="normal"
//                     variant="outlined"
//                 />
//             </td>
//             <td>
//                 <TextField
//                     disabled={!this.getSwitchState(this.state.switches, item.ItemID)}
//                     id="standard-number"
//                     name="Price"
//                     value={item.Price}
//                     onChange={(event) => this.handleChange(event, index)}
//                     type="number"
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     margin="normal"
//                     varirant="outlined"
//                 />
//             </td>
//             <td>
//                 <FormControlLabel
//                     control={
//                         <Switch
//                             checked={this.getSwitchState(this.state.switches, item.ItemID)}
//                             onChange={(event) => this.handleEditingSwitch(event, item.ItemID)}
//                             value={item.ItemID}
//                             color="primary"
//                         />
//                     }
//                     label="Editing"
//                 />
//                 {/* <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} color="primary" aria-label="edit" size="small">
//                     <EditIcon />
//                 </Fab> */}
//                 <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.deleteUser(index)} color="secondary" aria-label="delete" size="small">
//                     <DeleteIcon />
//                 </Fab>
//                 <Fab disabled={!this.getSwitchState(this.state.switches, item.ItemID)} onClick={() => this.updateUser(this.state.users[index])} color="primary" aria-label="save" size="small">
//                     <SaveIcon />
//                 </Fab>
//             </td>
//         </tr>
        
//     ) : (<tr><td>Error</td></tr>);

//         return (
// //                 <table>
// //                     <thead>
//                         <tr>
//                             <th>
//                                 ItemID
//                             </th>
//                             <th>
//                                 Title
//                             </th>
//                             <th>
//                                 Description
//                             </th>
//                             <th>
//                                 Mass
//                             </th>
//                             <th>
//                                 Calorie count
//                             </th>
//                             <th>
//                                 Price
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items}
//                     </tbody>
//                 </table>
//         )
//     }
// }

// const mapStateToProps = (state) => ({
//     Items: state.itemsReducer.Items
// })

// const mapDispatchToProps = {
//     // push
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ItemList)

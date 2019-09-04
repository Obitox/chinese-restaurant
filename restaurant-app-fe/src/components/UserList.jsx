import React, { Component, forwardRef } from 'react'
import { connect } from 'react-redux'

import { loadUserTableColumns, updateUser, deleteUser, addUser } from '../actions/adminDashboard'

// Styling
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField'

export class UserList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        // let userLookup = {};

        // for(var i = 0; i< this.props.Users.length; i++){
        //     user
        // }

        let columns = [
            {
                title: 'UserID',
                field: 'UserID',
                type: 'numeric'
            },
            {
                title: 'Username',
                field: 'Username'
            },
            // {
            //     title: 'Password',
            //     field: 'Password'
            // },
            {
                title: 'Password',
                field: 'Password',
                render: rowData => <TextField
                                        id="standard-bare"
                                        value={rowData.Password}
                                        // className={classes.textField}
                                        type="password"
                                        margin="normal"
                                    />
            },
            {

                title: 'Role',
                field: 'Role'
            },
            {
                title: 'FirstName',
                field: 'FirstName'
            },
            {
                title: 'LastName',
                field: 'LastName'
            },
            {
                title: 'Address1',
                field: 'Address1'
            },
            {
                title: 'Address2',
                field: 'Address2'
            },
            {
                title: 'Address3',
                field: 'Address3'
            },
            {
                title: 'Phone',
                field: 'Phone'
            },
            {
                title: 'Email',
                field: 'Email'
            }
        ];

        this.props.loadUserTableColumns(columns);
    }


    
    render() {
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
          };

          console.log(this.props.Users);
          console.log(this.props.Columns);
        
          return (
            <MaterialTable
              icons={tableIcons}
              title="Maintain users"
              columns={this.props.Columns}
              // data={this.state.data}
              data={this.props.Users}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        const data = [...this.props.Users];
                        data.push(newData);
                        this.props.addUser(data, newData, this.props.csrf);
                    //   const data = [...this.state.data];
                    //   data.push(newData);
                    //   this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.props.Users];
                      data[data.indexOf(oldData)] = newData;
                      this.props.updateUser(data, newData, this.props.csrf);
                      // this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.props.Users];
                      data.splice(data.indexOf(oldData), 1);
                      this.props.deleteUser(data, oldData, this.props.csrf);
                      // this.setState({ ...this.state, data });
                    }, 600);
                  }),
              }}
              options={{
                exportButton: true
              }}
            />
            // <Snackbar
            //     anchorOrigin={{
            //         vertical: 'top',
            //         horizontal: 'right',
            //     }}
            //     open={this.props.Open}
            //     autoHideDuration={6000}
            //     onClose={this.props.handleClose}
            // >
            //     <MySnackbarContentWrapper
            //         onClose={this.props.handleClose}
            //         variant={this.props.IsSuccessful ? 'success': 'error'}
            //         message={this.props.Message}
            //     />
            // </Snackbar>
        )
    }
}

const mapStateToProps = (state) => ({
    Users: state.usersReducer.Users,
    Columns: state.usersReducer.Columns
})

const mapDispatchToProps = {
    loadUserTableColumns,
    updateUser,
    deleteUser,
    addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)

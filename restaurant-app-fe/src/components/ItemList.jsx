import React, { Component, forwardRef } from 'react'
import { connect } from 'react-redux'

// STYLING
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
import MaterialTable from 'material-table'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

import { loadTableColumns, updateItem, deleteItem } from '../actions/adminDashboard'

class ItemList extends Component {
    constructor(props){
        super(props);

        let categoryLookup = {};

        for(var i = 0; i < props.categories.length; i++){
          categoryLookup[props.categories[i].CategoryID] = props.categories[i].Title;
        }

        this.state = {
            columns: [
                {
                    title: 'ItemID',
                    field: 'ItemID',
                    type: 'numeric'
                },
                {
                    title: 'Title',
                    field: 'Title'
                },
                {
                    title: 'Description',
                    field: 'Description'
                },
                {
                    title: 'Mass',
                    field: 'Mass',
                    type: 'numeric'
                },
                {
                    title: 'Calorie count',
                    field: 'CalorieCount',
                    type: 'numeric'
                },
                {
                    title: 'Price',
                    field: 'Price',
                    type: 'numeric'
                },
                {
                  title: 'Category',
                  field: 'CategoryID',
                  lookup: categoryLookup
                }
                // {
                //   title: 'Ingredients',
                //   field: 'IngredientID',
                //   lookup: ingredientLookup
                // }
                // {
                //   title: 'Ingredients',
                //   field: 'Ingredients',
                //   render: rowData => <input type="text" value={rowData.Ingredients.join()} />
                // }
            ],
            // data: props.items,
            data: this.props.Items,
            // categories: props.categories,
            category: ''
            // ingredients: [] 
        };
        // console.log(props.Items);
        // this.openItemDialog = this.openItemDialog.bind(this);
    }

    handleChange = (event) => {
        let data = this.state.data;

        data.Ingredients = event.target.value;


        this.setState({
          ['data']: data
        })
    }

    componentDidMount = () => {
      let categoryLookup = {};

      for(var i = 0; i < this.props.Categories.length; i++){
        categoryLookup[this.props.Categories[i].CategoryID] = this.props.Categories[i].Title;
      }

      let columns = [
          {
              title: 'ItemID',
              field: 'ItemID',
              type: 'numeric'
          },
          {
              title: 'Title',
              field: 'Title'
          },
          {
              title: 'Description',
              field: 'Description'
          },
          {
              title: 'Mass',
              field: 'Mass',
              type: 'numeric'
          },
          {
              title: 'Calorie count',
              field: 'CalorieCount',
              type: 'numeric'
          },
          {
              title: 'Price',
              field: 'Price',
              type: 'numeric'
          },
          {
            title: 'Category',
            field: 'CategoryID',
            lookup: categoryLookup
          }
      ];

      this.props.loadTableColumns(columns);
      // let column = { 
      //   title: 'Ingredients',
      //   field: 'Ingredients',
      //   render: rowData =>  (
      //               <FormControl>
      //                 <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
      //                 <Select
      //                   multiple
      //                   value={rowData.Ingredients}
      //                   onChange={this.handleChange}
      //                   input={<Input id="select-multiple-checkbox" />}
      //                   renderValue={selected => selected.join(', ')}
      //                   // MenuProps={MenuProps}
      //                 >
      //                   {rowData.Ingredients.map(ingredient => (
      //                     <MenuItem key={ingredient.Title} value={ingredient.Title}>
      //                       <Checkbox checked={this.props.ingredients.indexOf(ingredient.Title) > -1} />
      //                       <ListItemText primary={ingredient.Title} />
      //                     </MenuItem>
      //                   ))}
      //                 </Select>
      //               </FormControl>
      //   )
      // }

      // this.setState(prevState => ({
      //   columns: [...prevState.columns, column]
      // }));
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

        return (
            <MaterialTable
              icons={tableIcons}
              title="Maintain items"
              columns={this.props.Columns}
              // data={this.state.data}
              data={this.props.Items}
              editable={{
                // onRowAdd: newData =>
                //   new Promise(resolve => {
                //     setTimeout(() => {
                //       resolve();
                //       const data = [...this.state.data];
                //       data.push(newData);
                //       this.setState({ ...this.state, data });
                //     }, 600);
                //   }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.props.Items];
                      data[data.indexOf(oldData)] = newData;
                      this.props.updateItem(data, newData, this.props.csrf);
                      // this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.props.Items];
                      data.splice(data.indexOf(oldData), 1);
                      console.log('OLD DATA:');
                      console.log(oldData);
                      console.log(data);
                      this.props.deleteItem(data, oldData, this.props.csrf);
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
    // Items: state.itemsReducer.Items,
    // Item: state.itemsReducer.Item,
    // Open: state.itemsReducer.Open,
    // IsSuccessful: state.itemsReducer.IsSuccessful,
    // Message: state.itemsReducer.Message
    Categories: state.categoriesReducer.Categories,
    IsSuccessful: state.itemsReducer.IsSuccessful,
    Items: state.itemsReducer.Items,
    Columns: state.itemsReducer.Columns
})

const mapDispatchToProps = {
    loadTableColumns,
    updateItem,
    deleteItem
    // push
    // openItemDialog,
    // closeItemDialog,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
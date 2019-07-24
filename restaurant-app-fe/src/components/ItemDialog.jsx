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
    this.state = {
        open: false
    };
  }

  handleClickOpen = () => {
      this.setState({['open']: true});
  }

  handleClose = () => {
      this.setState({['open']: false});
  }

//   function handleClickOpen() {
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

  render(){
    return (
        <div>
          
        </div>
      );
  }
}
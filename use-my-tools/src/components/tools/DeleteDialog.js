import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import { get } from 'https';

class DeleteDialog extends React.Component {
  state = {
    open: false,
    error: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

  handleConfirm = () => {
    const id = this.props.toolId;
    // axios.post('/api/approvedemails', rep)
    // .then(id => {
    //     this.handleClose();
    // })
    // .catch(error => {
    //     this.setState({ error: error.message });
    // })
  };

  render() {
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Delete Tool
          </Button>
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            
              <div>
                <DialogTitle id="form-dialog-title">Delete Tool</DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delte this tool?
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleCancel} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleConfirm} color="primary">
                    Delete
                  </Button>
                </DialogActions>
              </div>
            
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default DeleteDialog;
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

export default function LLawDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

   // Open the dialog when the component mounts
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"USER ACKNOWLEDGEMENT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Bar Council of India does not permit solicitation of work and advertising by 
            legal practitioners and advocates. By accessing www.pandblegal.in, the user acknowledges that:
          </DialogContentText>
        </DialogContent>
                <DialogTitle id="alert-dialog-title">
          {"DISCLAIMER"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          The user wishes to gain more information about us for his/her information and use. He/She also acknowledges that there has been no attempt by us to advertise or solicit work. Any information obtained or downloaded by the user from our website does not lead to the creation of the client - attorney relationship between the Firm and the user. None of the information contained in our website amounts to any form of legal opinion or legal advice.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
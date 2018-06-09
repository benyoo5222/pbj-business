import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});


class EditForm extends Component {

  handleClose = () => {
    this.props.close(false)
    console.log(this.props.info)
  }

  render () {
    const { classes } = this.props;
    console.log(this.props.info)
    return (
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.open}
        >
          <DialogTitle>{this.props.info.description}</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple" >Service Description</InputLabel>
                <Input id="name-simple" placeholder={this.props.info.description} onChange={this.handleChange} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Age</InputLabel>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditForm);
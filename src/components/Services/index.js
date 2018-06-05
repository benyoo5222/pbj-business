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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


import Services from './services.js'
import axios from 'axios'

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

class Serviceslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentServices: [],
      editServices: {
        billingCode: "",
        description: "",
        priceCents: 0,
        durationMin: 0
      }
    }
  }
  openForm = (open, value) => {
    if (typeof value === Number) {
      const currentServices = this.props.data.business.services.filter(service => service.billingCode === value)
      this.setState({open: open, currentServices: currentServices})
    } else if (value === "Add") {
      this.setState({open: open})
    }

  }
  closeForm = (e) => {
    this.setState({open: false})
  }
  handleChange = (serviceId, event) => {
    const {name, value} = event.target;
    const editedService = {...this.state.editServices, type: "edit", [name]: value, billingCode: serviceId[0]}
    this.setState({editServices: editedService})
  }
  sendEdit = () => {
    // Need to make sure that it doens't edit if no fields were entered.
    const array = this.props.data.business.services.filter( value => value.billingCode !== this.state.editServices.billingCode)
    const newestarray = [...array, this.state.editServices]
    newestarray.sort(function(a, b) {
      return a.billingCode - b.billingCode;
    })
    axios.put(`http://localhost:5000/api/business/123456123456123456123456/services`,
      {data: newestarray})
      .then(res => {
        const settingState = [this.state.editServices];
        this.setState({open: false})
      })
      .catch(err => {
        console.error(err)
      })

  }

  render() {
    const each_service = <Services data = {this.props.data.business} openForm={this.openForm} updateService={this.props.updateService}/>
    const { classes } = this.props;

    return (
      <main>
        {each_service}
        <div>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.state.open}
          >
            <DialogTitle>{this.state.currentServices.length > 0 ? this.state.currentServices.map(info => info.description) : "Add a service"}</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple" >Service Description</InputLabel>
                  <Input
                    id="name-simple"
                    name="description"
                    placeholder= {this.state.currentServices.map(info => info.description)}
                    onBlur={this.handleChange.bind(this, this.state.currentServices.map(info => info.billingCode))}/>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    name="durationMin"
                    id="time"
                    label="Max Time"
                    type="number"
                    onBlur={this.handleChange.bind(this, this.state.currentServices.map(info => info.billingCode))}
                    placeholder={this.state.currentServices.map(info => info.durationMin)}
                    className={classes.textField}
                    inputProps={{
                      step: 5, // 5 min
                    }}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    name= "priceCents"
                    label="Price"
                    type="number"
                    onBlur={this.handleChange.bind(this, this.state.currentServices.map(info => info.billingCode))}
                    placeholder={this.state.currentServices.map(info => info.priceCents)}
                    id="formatted-numberformat-input"
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeForm} color="primary">
                Cancel
              </Button>
              <Button onClick={this.sendEdit} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    )
  }
}

Serviceslist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Serviceslist);

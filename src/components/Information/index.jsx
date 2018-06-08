import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import CheckboxGroup from './CheckboxGroup'


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: this.props.business.name,
      address: this.props.business.address,
      phone: this.props.business.phone
     }
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  /* componentDidMount = () => {
    this.setState({
      name: this.props.business.name,
      address: this.props.business.address,
      phone: this.props.business.phone
    })
  } */

  render() {
    return (
      <div>
        Setup link
        max concurrent appointments

        <TextField
          id="name"
          label="Business Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          style={{display: 'block'}}
        />
        <TextField
          id="name"
          label="Address"
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
          style={{display: 'block'}}
        />
        <TextField
          id="name"
          label="Primary Phone"
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
          style={{display: 'block'}}
        />

        {/* <CheckboxGroup 
          formLabel="New appointment notification" 
          formHelperText="Get notified when a new booking is made"
          text
          /> */}
      </div>
    );
  }
}
 
export default Notifications;
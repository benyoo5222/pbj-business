import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddBox from "@material-ui/icons/AddBox"
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'

import EditForm from './editserviceform.js'

class Services extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  editService = (serviceId) => {
    const array = this.props.data.services.filter( value => value.billingCode !== serviceId)
    const editedService =
      {
        billingCode: `${serviceId}`,
        description: "See the Future of Jeff!",
        priceCents: 10000,
        durationMin: 10
      }
    const newestarray = [...array, editedService]
    newestarray.sort(function(a, b) {
      return a.billingCode - b.billingCode;
    })

    axios.put(`http://localhost:5000/api/business/${this.props.data["_id"]}/services`,
      {data: newestarray})
      .then(res => this.props.updateService(newestarray))
      .catch(err => {
        console.error(err)
      })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = (close) => {
    this.setState({open:close})
  }

  render () {
    return (
      <List>
        {this.props.data.name === "Ben's Hair salon" &&
          this.props.data.services.map(eachService =>
            <ListItem >
              <ListItemText primary= {`${eachService.description} ${eachService.durationMin} ${eachService.priceCents}`} />

              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <EditIcon onClick={this.handleOpen}/>
                  <EditForm open={this.state.open} close={this.handleClose} info={eachService}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
      )}
      </List>
    )
  }
}

export default Services;

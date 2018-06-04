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

  handleOpen = (serviceId) => {
    this.props.openForm(true, serviceId)
  }

  render () {
    return (
      <List>
        {this.props.data.services.map(eachService =>
            <ListItem key={eachService.billingCode}>
              <ListItemText primary= {`${eachService.description} ${eachService.durationMin} ${eachService.priceCents}`} />

              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <EditIcon onClick={this.handleOpen.bind(this, eachService.billingCode)}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
      )}
      </List>
    )
  }
}

export default Services;

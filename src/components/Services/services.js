import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddBox from "@material-ui/icons/AddBox"
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditForm from './editserviceform.js'

class Services extends Component {

  handleOpen = (serviceDetail) => {
    this.props.openForm(true, serviceDetail)
  }

  render () {
    return (
      <List>
        {this.props.data.services.map(eachService =>
            <ListItem key={eachService.billingCode}>
              <ListItemText primary= {`${eachService.description} ${eachService.durationMin} ${eachService.priceCents}`} />

              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <EditIcon name="Ben" value="AbC" onClick={this.handleOpen.bind(this, eachService.billingCode)}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
      )}
        <Button variant="outlined" color="primary" onClick={this.handleOpen.bind(this, "Add Service")}>
          Add Service
        </Button>
      </List>
    )
  }
}

export default Services;

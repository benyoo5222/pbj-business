import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddBox from "@material-ui/icons/AddBox"
import EditIcon from '@material-ui/icons/Edit';

class Services extends Component {

  clickEvent = (e) => {
    console.log(e);
  }

  render () {
    return (
      <List>
        {this.props.data.services.map(value => {
         if (value.name === "Peter's Psychic Readings") {
          return value.services.map(eachService =>
            <ListItem >
              <ListItemText primary= {`${eachService.description} ${eachService.durationMin} ${eachService.priceCents}`} />

              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
         }
        }
      )}
      </List>
    )
  }
}

export default Services;

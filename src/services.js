import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddBox from "@material-ui/icons/AddBox"
import EditIcon from '@material-ui/icons/Edit';

class Services extends Component {
  render () {
    return (
      <List>
        {this.props.data.map(value =>
          <ListItem >
            <ListItemText primary= {`${value.name} ${value.duration} ${value.price}`} />

            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    )
  }
}

export default Services;

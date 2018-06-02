import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddBox from "@material-ui/icons/AddBox"
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'

class Services extends Component {

  editService = (serviceId) => {
    console.log(serviceId)
    console.log(this.props.data)

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
      .then(res => console.log(res))
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
                  <EditIcon onClick = {this.editService.bind(this, eachService.billingCode)}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
      )}
      </List>
    )
  }
}

export default Services;

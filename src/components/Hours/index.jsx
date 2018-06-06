import React, {Component} from 'react';
import HoursTable from './HoursTable.jsx';
import axios from 'axios';

class Hours extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

//----------Server Functions----------------
//takes in the business ID and hoursPackage
EditHoursDB = (hours) => {
  //console.log(hours);
  axios.put(`http://localhost:5000/api/business/123456123456123456123456/hours`,
    {data: hours})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err)
    })
}

  render() {
    return (
      <HoursTable
        businessHours={this.props.businessHours}
        handleBusinessInput={this.props.handleBusinessInput}
        EditHoursDB={this.EditHoursDB}
      />
    );
  }
}

export default Hours;
import React, {Component} from 'react';
import HoursTable from './HoursTable.jsx';

class Hours extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: [
        {day: "Monday", opening: "09:00", closing: "09:00"},
        {day: "Tuesday", opening: "09:00", closing: "09:00"},
        {day: "Wednesday", opening: "09:00", closing: "09:00"},
        {day: "Thursday", opening: "09:00", closing: "09:00"},
        {day: "Friday", opening: "09:00", closing: "09:00"},
        {day: "Saturday", opening: "09:00", closing: "09:00"},
        {day: "Sunday", opening: "09:00", closing: "09:00"}
      ]
    }
  }

  render() {
    return (
      <HoursTable businessHours={this.state.hours}/>
    )
  }
}

export default Hours;

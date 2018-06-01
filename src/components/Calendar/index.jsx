import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { getEvents } from './lib.js'
BigCalendar.momentLocalizer(moment)

require('react-big-calendar/lib/css/react-big-calendar.css')

const calendarStyle = {
  height: '500px'
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: []
     }
  }
  componentDidMount() {
    getEvents().then(events => {
      this.setState({events})
    })
  }
  render() { 
    return (
      <div>
        <BigCalendar 
          style={calendarStyle}
          events={this.state.events}
          defaultDate={new Date()}
          defaultView='week'
          drilldownView="agenda"

          scrollToTime={new Date()}
          />
      </div>
     )
  }
}
 
export default Calendar;
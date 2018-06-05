import React, { Componet } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

// handleTime = (event) => {
//   console.log(event.target.value);
// }

class HoursRow extends Componet {

  constructor(props) {
    super(props);
    this.state = {
      day: null,
      opening: null,
      closing: null
    };
  }

  componentDidMount() {
    const { hours } =  this.props;
    this.setState({
      day: hours.day,
      opening: hours.opening,
      closing: hours.closing
    })
  }

  buildHours = () => {
    const hours = {
      day: props.day,
      opening:
    }
    return hours;
  }

  const handleTime = (event) => {
    const {name, value} = event.target;
    buildHours(name, value);
  }

  render(){
    return (
      <TableRow>
        <TableCell>
          {props.hours.day}
        </TableCell>
        <TableCell>
          <form noValidate>
            <TextField
              id="open"
              type="time"
              name="opening"
              defaultValue={props.hours.opening}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={handleTime}
            />
          </form>
        </TableCell>
        <TableCell>
          <form noValidate>
            <TextField
              id="close"
              type="time"
              name="closing"
              defaultValue={props.hours.closing}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={handleTime}
            />
          </form>
        </TableCell>
      </TableRow>
    );
  }
}

export default HoursRow;
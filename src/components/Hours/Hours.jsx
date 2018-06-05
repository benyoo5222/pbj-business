import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

// handleTime = (event) => {
//   console.log(event.target.value);
// }

function Hours(props) {

  const handleTime = (event) => {
    console.log(event.target.value);
  }

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

export default Hours;
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Hours from './Hours.jsx';

function HoursTable (props) {
  const { classes } = props;

  const hours = props.businessHours.map((hours, i) => {
    return <Hours
      key={i}
      hours={hours}
    />
  });

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day of the Week</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>Close</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hours}
        </TableBody>
      </Table>
  );
}

export default HoursTable;
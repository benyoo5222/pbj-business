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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, open, close) {
  id += 1;
  return { id, name, open, close };
}

const data = [
  createData('Monday', "9:00 AM", "9:00 PM"),
  createData('Tuesday', "9:00 AM", "9:00 PM"),
  createData('Wednesday', "9:00 AM", "9:00 PM"),
  createData('Thursday', "9:00 AM", "9:00 PM"),
  createData('Friday', "9:00 AM", "9:00 PM"),
  createData('Saturday', "9:00 AM", "9:00 PM"),
  createData('Sunday', "9:00 AM", "9:00 PM")
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Day of the Week</CustomTableCell>
            <CustomTableCell numeric>Open</CustomTableCell>
            <CustomTableCell numeric>Close</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell component="th" scope="row">
                  {n.name}
                </CustomTableCell>
                {/*<CustomTableCell numeric>{n.open} <EditIcon /> </CustomTableCell>
                <CustomTableCell numeric>{n.close} <EditIcon /> </CustomTableCell>*/}
                <CustomTableCell numeric>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="time"
                      label="Opening Time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </form>
                </CustomTableCell>
                <CustomTableCell numeric>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="time"
                      label="Closing Time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </form>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
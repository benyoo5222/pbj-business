import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Services from './components/Services';
import Calendar from './components/Calendar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: []
    }
  }

  getServices = (e) => {
    console.log(e.target);

    fetch("http://localhost:5000/api/business")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.map( eachService => {
          let newServiceArray = [...this.state.services, eachService];
          this.setState({services: newServiceArray})
        })
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              PBJ Scheduler
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />

            <List>Schedule</List>
            <List onClick = {this.getServices}>Services</List>
            <List>Hours</List>
            <List>Notification</List>
            <Divider />
            <List>Report</List>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path='/' component={Calendar} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/services' component={Services} data={this.state} />
            <Route render={() => { return (<div>404! 🙃</div>)}}/>
          </Switch>


          <Services data= {this.state} />
        </main>
      </div>
    );
  }

}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
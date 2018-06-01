import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Services from './components/Services';
import Calendar from './components/Calendar';

import { BUSINESS_ID } from './calendar_secrets.json'

import './App.css';
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



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {
        name: '',
        services: []
      }
    }
  }
  getBusinessId = () => {
    // This method would normally get the business ID from login/cookie
    return BUSINESS_ID
  }
  fetchBusinessData = (businessId) => {
    axios.get(`http://localhost:5000/api/business/${businessId}`)
      .then(res => {
        const business = res.data[0]
        if (!business) throw new Error(`Error fetching data from business ID ${businessId}`)
        this.setState({business: business})
      }).catch(err => {
        console.error(err)
      })
  }
  componentDidMount() {
    this.fetchBusinessData(this.getBusinessId())
  }
  render() {
    const { classes } = this.props;
    return (
        <BrowserRouter className="App">

          <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
              <Toolbar>
                <Typography variant="title" color="inherit" noWrap>
                  {this.state.business.name || 'PBJ Scheduler'}
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
              <List>
                <ListItem button component="a" href="/calendar">
                  <ListItemText primary="Calendar"></ListItemText>
                </ListItem>
                <ListItem button component="a" href="/services">
                  <ListItemText primary="Services"></ListItemText>
                </ListItem>
                <ListItem button component="a" href="/hours">
                  <ListItemText primary="Hours"></ListItemText>
                </ListItem>
                <ListItem button component="a" href="/notifications">
                  <ListItemText primary="Notifications"></ListItemText>
                </ListItem>
                <ListItem button component="a" href="/reports">
                  <ListItemText primary="Reports"></ListItemText>
                </ListItem>
              </List>

            </Drawer>

            <main className={classes.content}>
              <div className={classes.toolbar} />

              <Switch>
                {/* <Route exact path='/' component={Calendar} /> */}
                <Route exact path='/' render={() => { return (<div> Welcome to business</div>) }} />
                <Route path='/calendar' component={Calendar} />
                <Route path='/services' component={Services} data={this.state.business} />
                <Route render={() => { return (<div>404! :(</div>) }} />
              </Switch>

            </main>
          </div>

        </BrowserRouter>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);

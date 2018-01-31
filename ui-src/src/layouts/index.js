import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Menu, { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Profile from './profile'
import Messages from './messages'
import { Route, Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  demo: {
    height: 800
  },
  paper: {
    padding: 16,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  suggestions: {
    padding: 8,
    margin: 8,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    flex: 1,
    height: '100%'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Index extends React.Component {
  state = {
    open: false,
    spacing: '16',
    auth: true,
    anchorEl: null,
    direction: 'row',
    justify: 'center',
    alignItems: 'stretch'
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  render () {
    const { classes } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <AppBar position='static'>
              <Toolbar>
                <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                  <MenuIcon />
                </IconButton>
                <Typography type='title' color='inherit'>
                  App: Clutter
                </Typography>
                <Paper className={classes.suggestions}>
                  <Typography component='p' color='inherit'>
                    Personalised suggestions
                  </Typography>
                </Paper>
                {auth && (
                  <div>
                    <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup='true' onClick={this.handleMenu} color='inherit'>
                      <AccountCircle />
                    </IconButton>
                    <Menu id='menu-appbar' anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} onClose={this.handleClose} >
                      <Link to='/profile'><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
        <Route path='/profile' exact component={Profile} />
        <Route path='/messages' exact component={Messages} />
        <Route path='/' exact component={Messages} />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))

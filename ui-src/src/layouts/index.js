import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Profile from './profile'
import Messages from './messages'
import { Route, Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
    flexGrow: 1
  },
  appBar: {
    height: '100%'
  },
  flex: {
    flex: 1
  },
  demo: {
    height: 900
  },
  paper: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  suggestions: {
    padding: 8,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    flex: 1,
    height: '100%'
  },
  search: {
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
    textAlign: 'left',
    color: theme.palette.text.secondary
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
    const bull = <span className={classes.bullet}>•</span>
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <AppBar position='static' className={classes.appBar}>
              <Toolbar>
                <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                  <MenuIcon />
                </IconButton>
                <Typography type='title' color='inherit' className={classes.flex}>
                  Philip Beadle
                </Typography>
                {auth && (
                  <div>
                    <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup='true' onClick={this.handleMenu} color='inherit'>
                      <Avatar src='philip-beadle-avatar.png' />
                    </IconButton>
                    <Menu id='menu-appbar' anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} onClose={this.handleClose} >
                      <Link to='/profile'><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
                      <Link to='/profile'><MenuItem onClick={this.handleClose}>Settings</MenuItem></Link>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.suggestions}>
              <Typography type='subheading' color='inherit'>
                {bull}Your idea 'Add a profile page' was added to the 'New Ideas' list 👏
              </Typography>
              <Typography type='subheading' color='inherit'>
                {bull}We recommend you read about how to be a <a href=''>Product Owner</a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.search}>
              <TextField id='search' label='Search' fullWidth className={classes.textField} margin='normal' />
            </Paper>
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

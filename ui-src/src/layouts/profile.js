import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Profile from '../components/profile'

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
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  suggestions: {
    padding: 5,
    margin: 15,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    flex: 1,
    height: 40
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
    const { alignItems, direction, justify } = this.state
    return (
      <Grid container spacing={8} justify='center'>
        <Grid item xs={6}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))

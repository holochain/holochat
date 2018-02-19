import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
})

class Profile extends Component {
  render () {
    const { classes } = this.props
    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='userName'
          label='User Name'
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin='normal'
        />
        <TextField
          id='firstName'
          label='First Name'
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin='normal'
        />
        <TextField
          id='lastName'
          label='Last Name'
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin='normal'
        />
        <TextField
          id='email'
          label='Email'
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin='normal'
        />
        <Button raised color='primary' className={classes.button}>
          Submit
       </Button>
      </form>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Profile))

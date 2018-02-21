import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Profile extends React.Component {

  constructor(props){
    super(props)
    console.log(props)
  }


  handleRegister = values => {
      this.props.register(values)
  }

  render() {
    const { classes, handleSubmit, userHash } = this.props;
    return (
      <div className={classes.root}>
      <Typography variant="display1" gutterBottom>
        User Hash: {userHash}
      </Typography>
        <form onSubmit={handleSubmit}>
        <div>
          <Field name="userName" component="input" type="text" label="Handle" />
        </div>
        <div>
        <Field name="firstName"  component="input" type="text" label="First Name" />
        </div>
        <div>
          <Field name="lastName"  component="input" type="text" label="Last Name" />
        </div>
        <div>
          <Field name="email"  component="input" type="text" label="Email" />
        </div>
        <Button variant="raised" color="secondary" onClick={handleSubmit(this.handleRegister)}>
          Register
        </Button>
      </form>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ProfileForm = reduxForm({form: 'Profile'})(Profile)

export default withRoot(withStyles(styles)(ProfileForm));

// export default ProfileForm

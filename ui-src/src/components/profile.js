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
    paddingTop: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

const renderTextField = ({ input, label, required, meta: { touched, error },  ...custom }) => (
  <TextField label={label} required={required} error={touched && error} {...input} {...custom} />
)

const validate = values => {
  const errors = {}
  const requiredFields = [
    'userName',
    'firstName',
    'lastName',
    'email'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
    }
  })
  return errors
}

class Profile extends React.Component {

  constructor(props){
    super(props)
  }


  handleRegister = values => {
      this.props.register(values)
  }

  render() {
    const { classes, handleSubmit, userHash } = this.props;
    return (
      <div className={classes.root}>
      <Typography name="userHash" variant="display1" gutterBottom>
        User Hash: {userHash}
      </Typography>
        <form onSubmit={handleSubmit}>
        <div>
          <Field name="userName" component={renderTextField} label="Handle" required={true} />
        </div>
        <div>
        <Field name="firstName" component={renderTextField} label="First Name" required={true} />
        </div>
        <div>
          <Field name="lastName" component={renderTextField} label="Last Name" required={true} />
        </div>
        <div>
          <Field name="email" component={renderTextField} label="Email" required={true} />
        </div>
        <Button name="register" variant="raised" className={classes.button} color="secondary" onClick={handleSubmit(this.handleRegister)}>
          Register
        </Button>
      </form>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

const ProfileForm = reduxForm({form: 'Profile', validate})(Profile)
export default withRoot(withStyles(styles)(ProfileForm));

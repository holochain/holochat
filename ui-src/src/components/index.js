import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {

  handleRegister = () => {
    this.props.register({
      username:'testUser',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email'
  })
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          User Hash: {this.props.userHash}
        </Typography>
        <Button variant="raised" color="secondary" onClick={this.handleRegister}>
          Super Secret Password
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

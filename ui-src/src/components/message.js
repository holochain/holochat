import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Collapse from 'material-ui/transitions/Collapse';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  reply: {
    marginLeft: theme.spacing.unit * 5,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  popover: {
    pointerEvents: 'none',
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

// pass in props from where the controls are instantiated
function UserControls(props) {
  if (props.isHovered) {
    return (
      <div className="actions">
        <Button
          id="thumbsUp"
          // onClick={this.handleThumbsUp}
        >
          👍
        </Button>
        <Button
          id="thumbsDown"
          // onClick={this.handleThumbsDown}
        >
          👍
        </Button>
      </div>
    );
  } else {
    return null;
  }
}

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      popperOpen: false,
      isHovered: false,
    };
    // the context of functions called within this component are not by default bound to this component, disabling reference to "this" unless the following context-bindings are in place.
    this.onMessageBlur = this.onMessageBlur.bind(this);
    this.onMessageHover = this.onMessageHover.bind(this);
  }

  // all dom event handlers have an event object that we can use
  // this ( below ) will not reference the component its intended to  unless 'this ' is bound to it above

  onMessageHover(event) {
    this.setState({ isHovered: true });
  }
  onMessageBlur(event) {
    this.setState({ isHovered: false });
  }

  render() {
    const { classes, message } = this.props;
    const { anchorEl } = this.state;
    const open = !!anchorEl;
    return (
      <List dense>
        <ListItem
          key={'1'}
          dense
          // when someone hovers over a message, show the options
          onMouseOver={this.onMessageHover}
          onMouseLeave={this.onMessageBlur}>
          <Avatar alt={message.author} src={message.avatar} />
          <ListItemText
            primary={[message.author, message.time].join(' ')}
            secondary={message.text}
            onMouseOver={this.handlePopoverOpen}
          />
        </ListItem>
        <UserControls isHovered={this.state.isHovered} />
        <Collapse in unmountOnExit>
          {message.replies.map((reply, index) => (
            <ListItem key={index} dense className={classes.reply}>
              <Avatar alt={reply.author} src={reply.avatar} />
              <ListItemText
                primary={[reply.author, reply.time].join(' ')}
                secondary={reply.text}
              />
            </ListItem>
          ))}
        </Collapse>
      </List>
    );
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Message));

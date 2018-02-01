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
    this.onMessageBlur = this.onMessageBlur.bind(this);
    this.onMessageHover = this.onMessageHover.bind(this);
    this.onMessageClick = this.onMessageClick.bind(this);
  }

  // handlePopoverOpen = event => {
  //   this.setState({ anchorEl: event.target });
  // };
  // handlePopoverClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  // all dom event handlers have an event object that we can use
  onMessageHover(event) {
    console.log('this message:', event.target, 'was just hovered');
    this.setState({ isHovered: true });
    console.log('state of message is now: isHovered:', this.state.isHovered);
  }
  onMessageBlur(event) {
    console.log('this message:', event.target, 'was just blurred');
    this.setState({ isHovered: false });
    console.log('state of message is now: isHovered: ', this.state.isHovered);
  }
  onMessageClick(event) {
    // console.log(event.target, 'clicked');
    // this ( below ) will not reference the component its intended to  unless 'this ' is bound to it above
    // this.setState({ isHovered: false });
    // console.log(this.state.isHovered);
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

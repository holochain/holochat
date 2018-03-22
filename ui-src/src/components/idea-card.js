import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRoot from '../withRoot';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Share from 'material-ui-icons/Share';
import Badge from 'material-ui/Badge';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import IconButton from 'material-ui/IconButton';
import InfoOutline from 'material-ui-icons/InfoOutline';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Message from '../components/message';

const styles = theme => ({
  card: {
    display: 'block',
    width: 362,
    minWidth: 275,
  },
  button: {
    minWidth: 25,
    width: 25,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

const message = {
  author: 'Art Brock',
  avatar: 'art-brock-avatar.png',
  time: '5.04pm',
  content: {
    text:
      "So, we're establishing two-way DHT links for following/followers... I think we should make them more visible. How about we put some counts below the profile pic for Mews / Following / Following ?",
  },
  idea: true,
  up: 7,
  down: 0,
  replies: [
    {
      author: 'Philip Beadle',
      avatar: 'philip-beadle-avatar.png',
      time: '7.04pm',
      text:
        "I was thinking the same thing.  Since I saw @connorturland's new way of selecting someone to follow I thought we should show Followers too.",
      image: 'followers-mockup.png',
      up: 9,
      down: 0,
    },
    {
      author: 'Philip Beadle',
      avatar: 'philip-beadle-avatar.png',
      time: '7.04pm',
      text:
        "And now that I've drawn a simple update to the page we should probably add in the ability to Block people as well",
      image: '',
      up: 9,
      down: 0,
    },
    {
      author: 'Connor Turland',
      avatar: 'connor-turland-avatar.png',
      time: '7.12am',
      text:
        'Eric already exposed some of that data over the API I think, and his version actually showed a bit of that stuff, but just a little bit clunky. I think maybe that stuff would be better on a User profile page',
      image: '',
      up: 9,
      down: 0,
    },
    {
      author: 'Connor Turland',
      avatar: 'connor-turland-avatar.png',
      time: '7.13am',
      text: 'followers, counts, etc',
      image: '',
      up: 9,
      down: 0,
    },
    {
      author: 'Philip Beadle',
      avatar: 'philip-beadle-avatar.png',
      time: '7.23am',
      text:
        'Agreed.  I think a pattern of each app having a profile page would be good to get some consistency as well.',
      image: '',
      up: 9,
      down: 0,
    },
  ],
};

class IdeaCard extends Component {
  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleThumbsUp = () => {
    console.log('up');
    // this.togglePopover()
  };
  handleThumbsDown = () => {
    console.log('down');
    // this.togglePopover()
  };
  render() {
    const { classes, idea } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar alt="Holochain" src={idea.avatar} />}
            title={idea.productOwner}
            subheader={idea.date}
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {idea.title}
            </Typography>
            <Typography component="p">{idea.description}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              className={classes.button}
              onClick={this.handleClickOpen}
              aria-label="ThumbDown">
              <InfoOutline />
            </IconButton>
            <a href="https://github.com/Holochain/clutter/issues/40">
              <Avatar alt="Holochain" src="GitHub-Mark.png" />
            </a>
            <Share />
            <Badge
              id="thumbsUpBadge"
              className={classes.badge}
              badgeContent={idea.up}
              color="secondary">
              <IconButton
                className={classes.button}
                onClick={this.handleThumbsUp}
                aria-label="ThumbUp">
                <ThumbUp />
              </IconButton>
            </Badge>
            <Badge
              className={classes.badge}
              badgeContent={idea.down}
              color="secondary">
              <IconButton
                className={classes.button}
                onClick={this.handleThumbsDown}
                aria-label="ThumbDown">
                <ThumbDown />
              </IconButton>
            </Badge>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Idea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add more detail to the Idea so it can be promoted to a Top Idea.
            </DialogContentText>
            <List>
              <ListItem key={1} dense className={classes.listItem}>
                <Message message={message} />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
IdeaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(IdeaCard));

import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import IdeaCard from '../components/idea-card'
import MessageList from '../components/lists/message-list'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import LightbulbOutline from 'material-ui-icons/LightbulbOutline'
import NoteAdd from 'material-ui-icons/NoteAdd'
import grey from 'material-ui/colors/grey'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import ChannelList from '../components/lists/channel-list'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 5,
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  demo: {
    height: 860
  },
  paper: {
    padding: 16,
    marginTop: 0,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: 'auto'
  },
  teams: {
    marginLeft: -8,
    background: theme.palette.action.primary,
    height: '100%'
  },
  channels: {
    height: '100%',
    background: grey[300]
  },
  messages: {
    height: '100%',
    position: 'relative'
  },
  messageInput: {
   position: 'fixed',
   width: '50%',
   left: '50%',
   bottom: '-8%',
   transform: 'translate(-50%, -50%)'

  },
  date: {
    width: '100%',
    textAlign: 'centre'
  },
  messageTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  ideas: {
    height: '100%',
    marginRight: 8
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
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  listItemMessage: {
    position: 'relative'
  }
})

const channels = [
  {group: 'Private',
    channels: [
      {
        title: 'DevLife Do-op',
        alerts: 5
      },
      {
        title: 'Documentation',
        alerts: 0
      },
      {
        title: 'Governance',
        alerts: 1
      }
    ]},
  {group: 'Public',
    channels: [
      {
        title: 'App:HoloChat',
        alerts: 5
      },
      {
        title: 'App:Clutter',
        alerts: 0
      },
      {
        title: 'HC Core',
        alerts: 1
      }
    ]},
  {group: 'Direct Message',
    channels: [
      {
        title: '@artbrock',
        alerts: 5,
        status: 'online'
      },
      {
        title: '@jonathanhaber',
        alerts: 0,
        status: 'away'
      },
      {
        title: '@lucksus',
        alerts: 1,
        status: 'offline'
      }
    ]}
]

const topIdeas = [
  {
    title: 'Poll Integration',
    productOwner: 'joatu-jamie',
    avatar: 'j-avatar.png',
    date: 'January 25, 2018 - Lead Time 6 weeks',
    description: 'To make it easier to gauge community support for an idea being able to attach a Poll to an idea would be cool.',
    up: 9,
    down: 0
  }
]

const artTopIdea = {
  title: 'Display both FOLLOWERS and FOLLOWING',
  productOwner: 'Art Brock',
  avatar: 'art-brock-avatar.png',
  date: 'January 30, 2018 - Lead Time 3 weeks',
  description: 'When clicking on Follow Someone, let\'s include a list of who is following you, not just who you are following. Either that or we add number/summary displays: Mews, Following, Followers under profile pic.',
  up: 37,
  down: 1
}

const artNewIdea = {
  title: 'Display both FOLLOWERS and FOLLOWING',
  date: 'January 22, 2018',
  description: 'When clicking on Follow Someone, let\'s include a list of who is following you, not just who you are following.'
}

const newIdeas = [
  {
    title: 'Add a profile page',
    date: 'January 25, 2018',
    description: 'Add a profile page. Add a profile page. Add a profile page. Add a profile page. Add a profile page. Add a profile page. Add a profile page. Add a profile page. ',
    isTopIdea: false,
    up: 9,
    down: 0
  },
  {
    title: 'Detect @mentions in post text',
    date: 'January 25, 2018',
    description: 'Detect @mentions in post text. Detect @mentions in post text Detect @mentions in post text Detect @mentions in post text Detect @mentions in post text Detect @mentions in post text Detect @mentions in post text Detect @mentions in post text',
    isTopIdea: false,
    up: 9,
    down: 0
  },
  {
    title: 'Reply to mew (add reply-to link + link to replies)',
    date: 'January 25, 2018',
    description: 'Reply to mew (add reply-to link + link to replies) Reply to mew (add reply-to link + link to replies) Reply to mew (add reply-to link + link to replies) Reply to mew (add reply-to link + link to replies) Reply to mew (add reply-to link + link to replies)',
    isTopIdea: false,
    up: 9,
    down: 0
  },
  {
    title: 'Display both FOLLOWERS and FOLLOWING',
    date: 'January 22, 2018',
    description: 'So, we\'re establishing two-way DHT links for following/followers... I think we should make them more visible. How about we put some counts below the profile pic for Mews / Following / Following ?',
    isTopIdea: true,
    up: 9,
    down: 0}
]

const messages = [
  {date: 'January 25th 2018',
    messages: [
      {
        type: 'Message',
        author: 'Art Brock',
        avatar: 'art-brock-avatar.png',
        time: '5.04pm',
        content: {
          text: 'Text message with an imageText message with an imageText message with an imageText message with an image',
          image: 'art-brock-avatar.png'},
        replies: [],
        idea: false,
        up: 7,
        down: 0
      },
      {
        type: 'Message',
        author: 'Art Brock',
        avatar: 'art-brock-avatar.png',
        time: '5.04pm',
        content: {
          text: 'Text message with no image',
          image: ''},
        replies: [],
        idea: false,
        up: 7,
        down: 0
      }
    ]},
  {date: 'January 26th 2018',
    messages: [
      {
        type: 'Message',
        author: 'Art Brock',
        avatar: 'art-brock-avatar.png',
        time: '5.04pm',
        content: {
          text: 'So, we\'re establishing two-way DHT links for following/followers... I think we should make them more visible. How about we put some counts below the profile pic for Mews / Following / Following ?',
          image: ''},
        idea: true,
        up: 7,
        down: 0,
        replies: [
          {
            type: 'Message',
            author: 'Philip Beadle',
            avatar: 'philip-beadle-avatar.png',
            time: '7.04pm',
            content: {
              text: 'I was thinking the same thing.  Since I saw @connorturland\'s new way of selecting someone to follow I thought we should show Followers too.',
              image: ''},
            image: 'followers-mockup.png',
            up: 9,
            down: 0
          },
          {
            type: 'Message',
            author: 'Philip Beadle',
            avatar: 'philip-beadle-avatar.png',
            time: '7.04pm',
            content: {
              text: 'And now that I\'ve drawn a simple update to the page we should probably add in the ability to Block people as well',
              image: ''},
            up: 9,
            down: 0
          },
          {
            type: 'Message',
            author: 'Connor Turland',
            avatar: 'connor-turland-avatar.png',
            time: '7.12am',
            content: {
              text: 'Eric already exposed some of that data over the API I think, and his version actually showed a bit of that stuff, but just a little bit clunky. I think maybe that stuff would be better on a User profile page',
              image: ''},
            up: 9,
            down: 0
          },
          {
            type: 'Message',
            author: 'Connor Turland',
            avatar: 'connor-turland-avatar.png',
            time: '7.13am',
            content: {
              text: 'followers, counts, etc',
              image: ''},
            up: 9,
            down: 0
          },
          {
            type: 'Message',
            author: 'Philip Beadle',
            avatar: 'philip-beadle-avatar.png',
            time: '7.23am',
            content: {
              text: 'Agreed.  I think a pattern of each app having a profile page would be good to get some consistency as well.',
              image: ''},
            up: 9,
            down: 0
          }
        ]
      },
      {
        type: 'Message',
        author: 'Mark Finnern',
        avatar: 'mark-finnern-avatar.png',
        time: '7.36am',
        content: {
          text: 'like to get greater clarity on some of the application design patterns  (at least the early ones) that are getting used so far.  He is also interested in getting a deeper feel of how bridging between apps might work as well as the ins and outs of DPKI. Information around that would also come handy at the Meetup on Wednesday',
          image: ''},
        idea: false,
        up: 9,
        down: 0,
        replies: []
      }
    ]}
]
class Index extends React.Component {
  state = {
    open: false,
    spacing: '16',
    auth: true,
    anchorEl: null,
    direction: 'row',
    justify: 'center',
    alignItems: 'stretch',
    newIdeas: newIdeas,
    topIdeas: topIdeas
  };
  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClickOpen = () => {
      this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  };
  handlePromoteNewIdea = () => {
    newIdeas.push(artNewIdea)
    this.setState({newIdeas: newIdeas})
  }
  handlePromoteTopIdea = () => {
    topIdeas.push(artTopIdea)
    newIdeas.splice(0, 1)
    this.setState({topIdeas: topIdeas})
    this.setState({newIdeas: newIdeas})
  }

  render () {
    const { classes } = this.props
    const { alignItems, direction, justify } = this.state
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Grid container spacing={8} className={classes.demo} alignItems={alignItems} direction={direction} justify={justify}>
            <Grid item xs={1}>
              <Paper className={[classes.paper, classes.teams].join(' ')}>
                <List>
                  <ListSubheader>Teams</ListSubheader>
                  <ListItem key={'HoloTeam'} dense button className={classes.listItem}>
                    <Avatar alt='Holo Team' src='holo-logo.png' />
                  </ListItem>
                  <ListItem key={'Holochain'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='holochain-circle.png' />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classNames(classes.paper, classes.channels)}>
              <ChannelList channels={channels} />
              </Paper>
            </Grid>
            <Grid  item xs={6}>
              <Paper className={classNames(classes.paper, classes.messages)}>
                <MessageList messages={messages} classes={classes} />
                <Paper className={classes.messageInput} >
                  <TextField className={classes.messageTextField} margin='normal' fullWidth label='Write a message' multiline rows='2' />
                </Paper>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classNames(classes.paper, classes.ideas)}>
                <List>
                  <ListSubheader>Top Ideas Ready to Build</ListSubheader>
                  {this.state.topIdeas.map((idea, index) => (
                    <ListItem key={index} dense className={classes.listItem}>
                      <IdeaCard idea={idea} />
                    </ListItem>
                  ))}
                </List>
                <div>
                  <List>
                    <ListSubheader>New Ideas Ready for Detail</ListSubheader>
                    {this.state.newIdeas.map((idea, index) => (
                      <ListItem key={index} dense className={classes.listItem}>
                        <ListItemText primary={[idea.title, idea.date].join(' ')} secondary={idea.description} />
                        <IconButton onClick={this.handlePromoteTopIdea}style={{display: (idea.isTopIdea === true) ? 'inline' : 'none'}} aria-label='Idea'>
                          <LightbulbOutline />
                        </IconButton>
                        <IconButton onClick={this.handleClickOpen} style={{display: (idea.isTopIdea !== true) ? 'inline' : 'none'}} aria-label='Idea'>
                          <NoteAdd />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                  >
                    <DialogTitle id='form-dialog-title'>New Idea</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Add more detail to the Idea so it can be promoted to a Top Idea.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Why should we build this?'
                        value='A really compelling story about how this idea will create value'
                        type='text'
                        fullWidth
                        multiline
                        rows='5'
                      />
                      <TextField
                        margin='dense'
                        id='name'
                        label='Product Owner'
                        value='Philip Beadle'
                        type='text'
                        fullWidth
                      />
                      <TextField
                        margin='dense'
                        id='name'
                        label='Description'
                        value='This is a compete description of how this idea works.'
                        type='text'
                        fullWidth
                        multiline
                        rows='5'
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color='primary'>
                        Cancel
                      </Button>
                      <Button onClick={this.handleClose} color='primary'>
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))

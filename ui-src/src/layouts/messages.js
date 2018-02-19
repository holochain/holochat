import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import IdeaCard from '../components/idea-card'
import Message from '../components/message'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import LightbulbOutline from 'material-ui-icons/LightbulbOutline'
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
    height: '100%'
  },
  messages: {
    height: '100%'
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
    title: 'Display both FOLLOWERS and FOLLOWING',
    date: 'January 22, 2018',
    description: 'When clicking on Follow Someone, let\'s include a list of who is following you, not just who you are following.'
  },
  {
    title: 'Add a profile page',
    date: 'January 25, 2018',
    description: 'Add a profile page.',
    up: 9,
    down: 0
  }
]

const jan25Messages = [
  {
    author: 'Art Brock',
    avatar: 'art-brock-avatar.png',
    time: '5.04pm',
    text: 'just merged the React version to master, once the build is done Ill tag it and a new version',
    replies: [],
    idea: false,
    up: 7,
    down: 0
  },
  {
    author: 'Philip Beadle',
    avatar: 'philip-beadle-avatar.png',
    time: '7.04pm',
    text: 'New release of Clutter using React as the UI - https://github.com/Holochain/clutter/releases',
    replies: [],
    idea: false,
    up: 9,
    down: 0
  }
]

const jan26Messages = [
  {
    author: 'Art Brock',
    avatar: 'art-brock-avatar.png',
    time: '5.04pm',
    text: 'So, we\'re establishing two-way DHT links for following/followers... I think we should make them more visible. How about we put some counts below the profile pic for Mews / Following / Following ?',
    replies: [
      {
        author: 'Philip Beadle',
        avatar: 'philip-beadle-avatar.png',
        time: '7.04pm',
        text: 'I was thinking the same thing.  Since I saw @connorturland\'s new way of selecting someone to follow I thought we should show Followers too.',
        up: 9,
        down: 0
      },
      {
        author: 'Philip Beadle',
        avatar: 'philip-beadle-avatar.png',
        time: '7.04pm',
        text: 'And now that I\'ve drawn a simple update to the page we should probably add in the ability to Block people as well',
        up: 9,
        down: 0
      },
      {
        author: 'Connor Turland',
        avatar: 'connor-turland-avatar.png',
        time: '7.12am',
        text: 'Eric already exposed some of that data over the API I think, and his version actually showed a bit of that stuff, but just a little bit clunky. I think maybe that stuff would be better on a User profile page',
        up: 9,
        down: 0
      },
      {
        author: 'Connor Turland',
        avatar: 'connor-turland-avatar.png',
        time: '7.13am',
        text: 'followers, counts, etc',
        up: 9,
        down: 0
      },
      {
        author: 'Philip Beadle',
        avatar: 'philip-beadle-avatar.png',
        time: '7.23am',
        text: 'Agreed.  I think a pattern of each app having a profile page would be good to get some consistency as well.',
        up: 9,
        down: 0
      }
    ],
    idea: true,
    up: 7,
    down: 0
  },
  {
    author: 'Mark Finnern',
    avatar: 'mark-finnern-avatar.png',
    time: '7.36am',
    text: 'like to get greater clarity on some of the application design patterns  (at least the early ones) that are getting used so far.  He is also interested in getting a deeper feel of how bridging between apps might work as well as the ins and outs of DPKI. Information around that would also come handy at the Meetup on Wednesday',
    replies: [],
    idea: false,
    up: 9,
    down: 0
  }
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
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
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
                <List>
                  <ListSubheader>Public Channels</ListSubheader>
                  <ListItem key={'App:Clutter'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='holochain-circle.png' />
                    <ListItemText primary={'App:Clutter'} />
                  </ListItem>
                  <ListItem key={'App:HoloChat'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='holochain-circle.png' />
                    <ListItemText primary={'App:HoloChat'} />
                  </ListItem>
                  <ListItem key={'HC:Core'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='holochain-circle.png' />
                    <Badge className={classes.badge} badgeContent={2} color='primary'>
                      <ListItemText primary={'HC:Core'} />
                    </Badge>
                  </ListItem>
                  <Divider />
                  <ListSubheader>Private Channels</ListSubheader>
                  <ListItem key={'DevLife'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='holochain-circle.png' />
                    <ListItemText primary={'Dev Life: Do-op'} />
                  </ListItem>
                  <ListItem key={'Documentation'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='holochain-circle.png' />
                    <ListItemText primary={'Documentation'} />
                  </ListItem>
                </List>
                <List>
                  <Divider />
                  <ListSubheader>Direct Messages</ListSubheader>
                  <ListItem key={'@connorturland'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='connor-turland-avatar.png' />
                    <ListItemText primary={'@connorturland'} />
                  </ListItem>
                  <ListItem key={'@adamthompson'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='adam-thompson-avatar.png' />
                    <ListItemText primary={'@adamthompson'} />
                  </ListItem>
                  <ListItem key={'@artbrock'} dense button className={classes.listItem}>
                    <Avatar alt='Holochain' src='Art-brock-avatar.png' />
                    <Badge className={classes.badge} badgeContent={6} color='primary'>
                      <ListItemText primary={'@artbrock'} />
                    </Badge>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classNames(classes.paper, classes.messages)}>
                <List>
                  <ListSubheader>January 25 2018</ListSubheader>
                  {jan25Messages.map((message, index) => (
                    <ListItem key={index} dense className={classes.listItemMessage}>
                      <Message message={message} />
                    </ListItem>
                  ))}
                  <Divider />
                  <ListSubheader>January 26 2018</ListSubheader>
                  {jan26Messages.map((message, index) => (
                    <ListItem key={index} dense className={classes.listItem}>
                      <Message message={message} />
                    </ListItem>
                  ))}
                </List>
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
                <List>
                  <ListSubheader>New Ideas Ready for Detail</ListSubheader>
                  {this.state.newIdeas.map((idea, index) => (
                    <ListItem key={index} dense className={classes.listItem}>
                      <ListItemText primary={[idea.tile, idea.date].join(' ')} secondary={idea.description} />
                      <IconButton onClick={this.handlePromoteTopIdea} aria-label='Idea'>
                        <LightbulbOutline />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
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

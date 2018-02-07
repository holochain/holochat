import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import withRoot from '../../withRoot'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'

const styles = theme => ({
  listItemMessage: {
    position: 'relative'
  },
  group: {

  },
  badge: {

  }
})

function BadgedLink (props) {
  if (props.channel.alerts > 0) {
    return (
      <Badge className={props.classes.badge} badgeContent={props.channel.alerts} color='secondary'>
        <Link className to={['channel/', props.channel.title].join('')}>{props.channel.title}</Link>
      </Badge>
    )
  } else {
    return (
      <Link className to={['channel/', props.channel.title].join('')}>{props.channel.title}</Link>
    )
  }
}

class ChannelList extends React.Component {
  render () {
    const { classes, channels } = this.props
    return (
      <div>
        <List>
          <ListItem dense className={classes.listItemMessage}>
            <Typography display='subheading'>{channels[0].group}</Typography>
          </ListItem>
          <ListItem dense className={classes.listItemMessage}>
            <List>
              {channels[0].channels.map((channel, index) => (
                <ListItem key={index} dense className={classes.listItemMessage}>
                  <BadgedLink classes={classes} channel={channel} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
        <List>
          <ListItem dense className={classes.listItemMessage}>
            <Typography display='subheading'>{channels[1].group}</Typography>
          </ListItem>
          <ListItem dense className={classes.listItemMessage}>
            <List>
              {channels[1].channels.map((channel, index) => (
                <ListItem key={index} dense className={classes.listItemMessage}>
                  <BadgedLink classes={classes} channel={channel} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
        <List>
          <ListItem dense className={classes.listItemMessage}>
            <Typography display='subheading'>{channels[2].group}</Typography>
          </ListItem>
          <ListItem dense className={classes.listItemMessage}>
            <List>
              {channels[2].channels.map((channel, index) => (
                <ListItem key={index} dense className={classes.listItemMessage}>
                  <BadgedLink classes={classes} channel={channel} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
      </div>
    )
  }
}

ChannelList.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.object.isRequired

}

export default withRoot(withStyles(styles)(ChannelList))

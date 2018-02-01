import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Badge from 'material-ui/Badge'
import Collapse from 'material-ui/transitions/Collapse'
import Popover from 'material-ui/Popover'
import Button from 'material-ui/Button'
import LightbulbOutline from 'material-ui-icons/LightbulbOutline'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    minWidth: 25,
    width: 25
  },
  reply: {
    marginLeft: theme.spacing.unit * 5
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  popover: {
    pointerEvents: 'none'
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
})

class Message extends Component {
  state = {
    displayPopover: true,
    displayLightBulb: false
  }

  togglePopover = () => {
    this.setState({ displayPopover: !this.state.displayPopover })
  }
  handlePopoverOpen = event => {
    this.setState({ displayPopover: true })
  }
  handleThumbsUp = () => {
    console.log('up')
    // this.togglePopover()
  }
  handleThumbsDown = () => {
    console.log('down')
    // this.togglePopover()
  }
  render () {
    const { classes, message } = this.props

    return (
      <List dense>
        <ListItem key={'1'} dense>
          <Avatar alt={message.author} src={message.avatar} />
          <ListItemText className='messageText' primary={[message.author, message.time].join(' ')} secondary={message.text} />
          <IconButton style={{display: (message.idea === true) ? 'block' : 'none'}} aria-label='Idea'>
            <LightbulbOutline />
          </IconButton>
          <IconButton className={classes.button} onClick={this.handleThumbsUp} aria-label='ThumbUp'>
            <ThumbUp />
          </IconButton>
          <IconButton className={classes.button} onClick={this.handleThumbsDown} aria-label='ThumbDown'>
            <ThumbDown />
          </IconButton>
        </ListItem>
        <Collapse in unmountOnExit>
          {message.replies.map((reply, index) => (
            <ListItem key={index} dense className={classes.reply}>
              <Avatar alt={reply.author} src={reply.avatar} />
              <ListItemText primary={[reply.author, reply.time].join(' ')} secondary={reply.text} />
            </ListItem>
          ))}
        </Collapse>
      </List>
    )
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Message))

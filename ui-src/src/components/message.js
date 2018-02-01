import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List'
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

function VoteControls (props) {
  // handleThumbsUp = () => {
  //   console.log('up')
  //   // this.togglePopover()
  // }
  // handleThumbsDown = () => {
  //   console.log('down')
  //   // this.togglePopover()
  // }
  if (props.isHovered) {
    return (
      <div style={{position: 'absolute', top: -16, right: -8, width: 100}}>
        <IconButton style={{display: (props.message.idea === true) ? 'inline' : 'none', minWidth: 25, width: 25}} aria-label='Idea'>
          <LightbulbOutline />
        </IconButton>
        <IconButton style={{minWidth: 25, width: 25}} aria-label='ThumbUp'>
          <ThumbUp />
        </IconButton>
        <IconButton style={{minWidth: 25, width: 25}} aria-label='ThumbDown'>
          <ThumbDown />
        </IconButton>
      </div>
    )
  } else {
    return null
  }
}

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false
    }
    this.onMessageBlur = this.onMessageBlur.bind(this)
    this.onMessageHover = this.onMessageHover.bind(this)
  }

  onMessageHover (event) {
    console.log('this message:', event.target, 'was just hovered')
    this.setState({ isHovered: true })
    console.log('state of message is now: isHovered:', this.state.isHovered)
  }
  onMessageBlur (event) {
    console.log('this message:', event.target, 'was just blurred')
    this.setState({ isHovered: false })
    console.log('state of message is now: isHovered: ', this.state.isHovered)
  }

  render () {
    const { classes, message } = this.props

    return (
      <List dense>
        <ListItem key={'1'} dense onMouseOver={this.onMessageHover} onMouseLeave={this.onMessageBlur}>
          <ListItemAvatar>
            <Avatar alt={message.author} src={message.avatar} />
          </ListItemAvatar>
          <ListItemText className='messageText' primary={[message.author, message.time].join(' ')} secondary={message.text} />
          <VoteControls isHovered={this.state.isHovered} message={message} />
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

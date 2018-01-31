import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Badge from 'material-ui/Badge'
import Collapse from 'material-ui/transitions/Collapse'
import Popover from 'material-ui/Popover'
import Button from 'material-ui/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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
    anchorEl: null,
    popperOpen: false
  }
  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target })
  }
  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }
  render () {
    const { classes, message } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl
    return (
      <List dense>
        <ListItem key={'1'} dense>
          <Avatar alt={message.author} src={message.avatar} />
          <ListItemText primary={[message.author, message.time].join(' ')} secondary={message.text} onMouseOver={this.handlePopoverOpen}  />
        </ListItem>
        <Popover
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={this.handlePopoverClose}>
          <Button id='thumbsUp'>
            👍
          </Button>
        </Popover>
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

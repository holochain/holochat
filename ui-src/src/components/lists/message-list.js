import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import withRoot from '../../withRoot'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Message from '../message'

const styles = theme => ({
  listItemMessage: {
    position: 'relative'
  }
})

class MessageList extends React.Component {
  render () {
    const { classes, messages } = this.props
    return (
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} dense className={classes.listItemMessage}>
            <Message message={message} />
          </ListItem>
        ))}
      </List>
    )
  }
}

MessageList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(MessageList))

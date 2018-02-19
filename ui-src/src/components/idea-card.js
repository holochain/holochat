import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Share from 'material-ui-icons/Share'
import Badge from 'material-ui/Badge'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'

const styles = theme => ({
  card: {
    display: 'block',
    width: 362,
    minWidth: 275
  },
  button: {
    minWidth: 25,
    width: 25
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
})

class IdeaCard extends Component {

  handleThumbsUp = () => {
    console.log('up')
    // this.togglePopover()
  }
  handleThumbsDown = () => {
    console.log('down')
    // this.togglePopover()
  }
  render () {
    const { classes, idea } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader avatar={<Avatar alt='Holochain' src={idea.avatar} />} title={idea.productOwner} subheader={idea.date} />
          <CardContent>
            <Typography type='headline' component='h2'>
              {idea.title}
            </Typography>
            <Typography component='p'>
              {idea.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
            <a href='https://github.com/Holochain/clutter/issues/40'><Avatar alt='Holochain' src='GitHub-Mark.png' /></a>
            <Share />
            <Badge id='thumbsUpBadge' className={classes.badge} badgeContent={idea.up} color='secondary'>
              <IconButton className={classes.button} onClick={this.handleThumbsUp} aria-label='ThumbUp'>
                <ThumbUp />
              </IconButton>
            </Badge>
            <Badge className={classes.badge} badgeContent={idea.down} color='secondary'>
              <IconButton className={classes.button} onClick={this.handleThumbsDown} aria-label='ThumbDown'>
                <ThumbDown />
              </IconButton>
            </Badge>
          </CardActions>
        </Card>
      </div>
    )
  }
}
IdeaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(IdeaCard))

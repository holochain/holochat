import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Share from 'material-ui-icons/Share'
import Badge from 'material-ui/Badge'

const styles = theme => ({
  card: {
    display: 'block',
    width: 362,
    minWidth: 275
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

function IdeaCard (props) {
  const { classes, idea } = props

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
            <Typography type='display1' id='thumbsUp'>
              👍
            </Typography>
          </Badge>
          <Badge className={classes.badge} badgeContent={idea.down} color='secondary'>
            <Typography type='display1'>
              👎
            </Typography>
          </Badge>
        </CardActions>
      </Card>
    </div>
  )
}

IdeaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IdeaCard)

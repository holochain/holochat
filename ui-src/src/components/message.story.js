import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Message from './message'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Message', module)
  .add('Display a message with no replies', () => {
    const message = {
      author: 'Philip Beadle',
      avatar: 'philip-beadle-avatar.png',
      time: '7.04pm',
      text: 'New release of Clutter using React as the UI - https://github.com/Holochain/clutter/releases',
      replies: [],
      up: 9,
      down: 0
    }

    return getMessage(message)
  })
  .add('Display a message with 2 replies', () => {
    const message = {
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
        }
      ],
      up: 7,
      down: 0
    }
    return getMessage(message)
  })
  .add('Display a message with 2 replies and has enough interest to be an idea', () => {
    const message = {
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
        }
      ],
      idea: true,
      up: 7,
      down: 0
    }
    return getMessage(message)
  })
function getMessage (message) {
  return (
    <Message message={message} handleThumbsUp={action('clicked Thumbs Up')} />
  )
}

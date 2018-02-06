import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MessageList from './message-list'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Message List', module)
  .add('Display a list of different types of messages', () => {
    const messages = [
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
      },
      {
        type: 'IdeaCard',
        author: 'Philip Beadle',
        avatar: 'philip-beadle-avatar.png',
        time: '7.04pm',
        content: {idea: {
          title: 'Display both FOLLOWERS and FOLLOWING',
          productOwner: 'Art Brock',
          avatar: 'art-brock-avatar.png',
          date: 'January 30, 2018 - Lead Time 3 weeks',
          description: 'When clicking on Follow Someone, let\'s include a list of who is following you, not just who you are following. Either that or we add number/summary displays: Mews, Following, Followers under profile pic.',
          up: 37,
          down: 1
        }
        },
        replies: [],
        idea: false,
        up: 9,
        down: 0
      }
    ]
    return getMessageList(messages)
  })
function getMessageList (messages) {
  return (
    <MessageList messages={messages} />
  )
}

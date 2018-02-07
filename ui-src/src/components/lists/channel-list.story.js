import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ChannelList from './channel-list'
import expect from 'expect'
import { MemoryRouter } from 'react-router';

configure({ adapter: new Adapter() })

storiesOf('Channel List', module)
.addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
))
  .add('Display a list of different types of messages', () => {
    const channels = [
      {group: 'Private',
        channels: [
          {
            title: 'DevLife Do-op',
            alerts: 5
          },
          {
            title: 'Documentation',
            alerts: 0
          },
          {
            title: 'Governance',
            alerts: 1
          }
        ]},
      {group: 'Public',
        channels: [
          {
            title: 'App:HoloChat',
            alerts: 5
          },
          {
            title: 'App:Clutter',
            alerts: 0
          },
          {
            title: 'HC Core',
            alerts: 1
          }
        ]},
      {group: 'Direct Message',
        channels: [
          {
            title: '@artbrock',
            alerts: 5,
            status: 'online'
          },
          {
            title: '@jonathanhaber',
            alerts: 0,
            status: 'away'
          },
          {
            title: '@lucksus',
            alerts: 1,
            status: 'offline'
          }
        ]}
    ]
    return getChannelList(channels)
  })
function getChannelList (channels) {
  return (
    <ChannelList channels={channels} />
  )
}

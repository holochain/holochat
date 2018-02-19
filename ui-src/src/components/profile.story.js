import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Profile from './profile'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Profile', module)
  .add('Registering a new person', () => {
    // const following = [
    //   {'handle': 'philt3r', 'userHash': 'wegwtrwrt'},
    //   {'handle': 'Test 2', 'userHash': 'dddd'}
    // ]
    specs(() => describe('The Follow Form with followed entities', function () {
      it('You can see the list of entities you are following, if you are following any.', () => {
        expect(true)
      })
    }))

    return getProfile()
  })

function getProfile () {
  return (
    <Profile submit={action('clicked Submit Button')} />
  )
}

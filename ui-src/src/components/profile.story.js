import React from 'react'
import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
// import { specs, describe, it } from 'storybook-addon-specifications'
// import { configure, mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
import ProfileForm from './profile'
// import expect from 'expect'

// configure({ adapter: new Adapter() })

import CreateStore from '../store'

let store = CreateStore()

storiesOf('Profile', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  // .addDecorator(story => (
  //   <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  // ))
  .add('Register a new person', () => {
    return getProfile()
  })

function getProfile () {
  return (
    <ProfileForm register={action('Clicked the Register button')} />
  )
}

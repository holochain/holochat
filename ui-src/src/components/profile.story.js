import React from 'react'
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileForm from './profile'
import expect from 'expect'

configure({ adapter: new Adapter() })

import CreateStore from '../store'

let store = CreateStore()

storiesOf('Profile', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Registration passes validation', () => {
    specs(() => describe('Registration passes validation', function () {
      it('If you click the "Register" button with all of the fields filled out the action "Clicked the Register button" will fire', () => {
        const wrapper = mount(<Provider store={store}><ProfileForm register={action('Clicked the Register button')} /></Provider>)
        wrapper.find('input[name="userName"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="firstName"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('input[name="lastName"]').simulate('change', {target: {value: 'Beadle'}})
        wrapper.find('input[name="email"]').simulate('change', {target: {value: 'philip.beadle@live.com.au'}})
        wrapper.find('button[name="register"]').simulate('click')
      })
    }))

    return getProfile()
  })
  .add('Registration fails validation', () => {
    specs(() => describe('Registration fails validation', function () {
      it('If you click the "Register" button without filling out all of the fields you will see the empty fields go red and you are not registered', () => {
        const wrapper = mount(<Provider store={store}><ProfileForm /></Provider>)
        wrapper.find('button[name="register"]').simulate('click')
      })
    }))

    return getProfile()
  })

function getProfile () {
  return (
    <ProfileForm register={action('Clicked the Register button')} />
  )
}

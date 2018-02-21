import React from 'react'
import { Provider } from 'react-redux'
import Profile from './containers/profileContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <Profile />
  </Provider>
)

export default Root

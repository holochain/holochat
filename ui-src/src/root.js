import React from 'react'
import { Provider } from 'react-redux'
import Index from './containers/indexContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <Index />
  </Provider>
)

export default Root

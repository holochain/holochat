import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from './layouts/index'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={Index} />
    </Router>
  </Provider>
)

export default Root

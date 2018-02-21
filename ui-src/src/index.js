import React from 'react'
import ReactDOM from 'react-dom'
import { compact } from 'lodash'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import holochatReducer from './reducers'
import Root from './root'
import { reducer as formReducer } from 'redux-form'
const middleware = compact([
    hcMiddleware,
    requestSendingMiddleware,
    promiseMiddleware
])

const rootReducer = combineReducers({
  holochatReducer,
  form: formReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(...middleware)))
ReactDOM.render(<Root store={store} />, document.querySelector('#root'))

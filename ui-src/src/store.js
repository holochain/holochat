import { compact } from 'lodash'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import holochatReducer from './reducers'
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
function CreateStore() {
  // MuiThemeProvider makes the theme available down the React tree
  // thanks to React context.
  return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(...middleware)))
}

export default CreateStore;

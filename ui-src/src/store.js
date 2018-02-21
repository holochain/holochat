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
  holochat: holochatReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
function CreateStore() {
  return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(...middleware)))
}

export default CreateStore;

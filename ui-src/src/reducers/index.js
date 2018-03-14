import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as A from '../actions'

const initialState = {
  profile: {
    'agent_hash': ''
  }
}

function profileReducer (state = initialState, action) {
  const { type, meta, payload } = action
  switch (type) {
    case A.REGISTER:
      return {
        ...state,
        profile: meta.data
      }
    case A.MYPROFILE:
      console.log('payload ' + payload)
      return {
        ...state,
        profile: payload
      }
    default:
      return state
  }
}

export default combineReducers({
  profile: profileReducer,
  form: formReducer
})

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as A from '../actions'

const initialState = {
  userHash: 'empty'
}

function profileReducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case A.REGISTER:
        return {
          ...state,
          userHash: payload
        }
    default:
      return state
  }
}

export default combineReducers({
  profile: profileReducer,
  form: formReducer
})

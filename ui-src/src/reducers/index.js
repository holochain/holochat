import * as A from '../actions'

const initialState = {
  userHash: ''
}

export default function holochatApp (state = initialState, action) {
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

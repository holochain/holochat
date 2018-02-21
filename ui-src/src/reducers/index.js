import * as A from '../actions'

const initialState = {
  userHash: 'empty'
}

export default function holochatReducer (state = initialState, action) {
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

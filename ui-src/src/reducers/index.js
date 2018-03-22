import * as A from '../actions'

const initialState = {
  key: 10
}

export default function holochatApp (state = initialState, action) {
  const { type, meta, payload } = action
  switch (type) {
    case A.REGISTER:
        console.log(payload)
      return state
    default:
      return state
  }
}
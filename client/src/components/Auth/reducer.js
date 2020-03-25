import { actionTypes } from './actions'

export const initialState = {
  isAuthenticated: false,
  user: {
    _id: '',
    username: '',
    name: '',
    email: '',
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.payload
    case actionTypes.LOGOUT:
      return action.payload
    default:
      return state
  }
}

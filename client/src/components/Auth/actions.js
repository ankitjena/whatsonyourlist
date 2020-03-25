import keymirror from 'keymirror'
import { initialState } from './reducer'

export const actionTypes = keymirror({ LOGIN: null, LOGOUT: null })

export function login(userDetails) {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.LOGIN,
      payload: {
        isAuthenticated: true,
        user: userDetails,
      },
    })
  }
}

export function logout() {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.LOGOUT,
      payload: {
        ...initialState,
      },
    })
  }
}

import { setUser } from '../../actions'

export function logout() {
  return async function(dispatch) {
    try {
      const response = await fetch('/logout')
      await response.json()
      dispatch(setUser(null))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getCurrentUser() {
  return async function(dispatch) {
    try {
      const response = await fetch('/current_user')
      const user = await response.json()
      dispatch(setUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}

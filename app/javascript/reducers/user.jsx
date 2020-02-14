const userReducer = (state = { users: [], current_user: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, current_user: action.payload }
    default:
      return state
  }
}

export default userReducer

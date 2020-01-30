const likesReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'SET_LIKES':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export default likesReducer

const likesReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'SET_LIKES':
      console.log('action')
      console.log(action.paylaod)
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export default likesReducer

const postsReducer = (state = { items: [], categories: [], isLoading: true }, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, items: action.payload }
    case 'SET_POSTS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    default:
      return state
  }
}

export default postsReducer

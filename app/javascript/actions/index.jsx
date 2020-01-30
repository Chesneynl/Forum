export const setPosts = posts => {
  return {
    type: 'SET_POSTS',
    payload: posts,
  }
}

export const setLoading = value => {
  return {
    type: 'SET_POSTS_LOADING',
    payload: value,
  }
}

export const setLikes = likes => {
  return {
    type: 'SET_LIKES',
    payload: likes,
  }
}

export const setCategories = categories => {
  return {
    type: 'SET_CATEGORIES',
    payload: categories,
  }
}

export const setPostCreated = value => {
  return {
    type: 'SET_POSTS_CREATED',
    payload: value,
  }
}

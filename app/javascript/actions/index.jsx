export const setPosts = posts => {
  return {
    type: 'SET_POSTS',
    payload: posts,
  }
}

export const setPost = post => {
  return {
    type: 'SET_POST',
    payload: post,
  }
}

export const setPostsLoading = value => {
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

export const setUser = user => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

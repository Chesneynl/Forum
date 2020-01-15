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

export function fetchPosts() {
  return async function(dispatch) {
    return fetch('/api/v1/posts')
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        dispatch(setPosts(json))
        dispatch(setLoading(false))
      })
  }
}

export function deletePost() {
  return async function(dispatch) {
    return fetch('/api/v1/posts', { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        dispatch(setPosts(json))
        dispatch(setLoading(false))
      })
  }
}

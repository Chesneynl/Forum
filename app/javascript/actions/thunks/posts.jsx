import { setPosts, setLoading, setCategories, setPostCreated } from '../../actions'

export function fetchCategories() {
  return async function(dispatch) {
    try {
      const response = await fetch('/api/v1/categories')
      const likes = await response.json()

      dispatch(setCategories(likes))
    } catch (error) {}
  }
}

export function fetchInActivePosts() {
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

export function fetchPosts() {
  console.log('fetchPosts')
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

export function fetchPostsByCategory() {
  console.log('fetchPostsByCategory')
  return async function(dispatch) {
    return fetch('/api/v1/category/1')
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

export function deletePost(id) {
  return async function(dispatch) {
    return fetch('/api/v1/destroy/' + id, { method: 'DELETE' })
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

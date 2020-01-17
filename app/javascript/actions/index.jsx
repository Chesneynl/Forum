import axios from 'axios'

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

export function likePost(id) {
  return async function(dispatch) {
    return fetch('/like', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      format: 'json',
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        console.log(response)

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        console.log('post liked')
      })
  }
}

export function dislikePost(id) {
  return async function(dispatch) {
    return fetch('/dislikelike/' + id, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        console.log('post liked')
      })
  }
}

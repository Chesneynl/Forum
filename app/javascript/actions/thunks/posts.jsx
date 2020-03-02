import { setPosts, setPost, setPostsLoading, setCategories } from '../../actions'

export function fetchCategories() {
  return async function(dispatch) {
    try {
      const response = await fetch('/api/v1/categories')
      const likes = await response.json()

      dispatch(setCategories(likes))
    } catch (error) {}
  }
}

export function fetchPosts(type, categoryId) {
  const postsType = type ? 'type=' + type : ''
  const category = categoryId ? 'categoryid=' + categoryId : ''
  const getCombination = type && categoryId ? '?' + postsType + '&' + category : '?' + postsType

  console.log(getCombination)

  return async function(dispatch) {
    return fetch('/api/v1/posts' + getCombination)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        dispatch(setPosts(json))
        dispatch(setPostsLoading(false))
      })
  }
}

export function fetchPostById(id) {
  return async function(dispatch) {
    return fetch('/api/v1/post/' + id)
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        console.log(json)
        dispatch(setPost(json))
        dispatch(setPostsLoading(false))
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
        dispatch(setPostsLoading(false))
      })
  }
}

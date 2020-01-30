import { setPosts, setLoading, setCategories, setPostCreated } from '../../actions'

export function fetchCategories() {
  return async function(dispatch) {
    try {
      const response = await fetch('/categories')
      const likes = await response.json()
      dispatch(setCategories(likes))
    } catch (error) {}
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

export function createPost(name, categoryId, attachment, description, csrfToken) {
  return async function(dispatch) {
    try {
      const params = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          attachment: attachment,
          posts_categories_id: categoryId,
        }),
      }
      await fetch('/api/v1/posts/create', params).then(response => {
        if (response.ok) {
          dispatch(setPostCreated(true))
          return response.ok
        }
      })
    } catch (error) {}
  }
}

// export function createPost(body, csrfToken) {
//   return async function(dispatch) {
//     return fetch('/api/v1/posts/create', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/vnd.api+json',
//         'X-CSRF-Token': csrfToken,
//       },
//       body: JSON.stringify(body),
//     })
//       .then(response => {
//         if (response.ok) {
//           return response.json()
//         }

//         console.log(response)

//         throw new Error('Network response was not ok.')
//       })
//       .then(function(json) {
//         console.log('post created')
//       })
//   }
// }

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

export function fetchLikes() {
  return async function(dispatch) {
    return fetch('/likes-and-dislikes')
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(function(json) {
        console.log(json)
        dispatch(setLikes(json))
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

export async function createPost(name, description, categoryId) {
  try {
    const params = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        posts_categories_id: categoryId,
      }),
    }
    const response = await fetch('/api/v1/posts/create', params)
    console.log(response)
    return await response.json()
  } catch (error) {
    this.handleError(error)
    return {
      status: 'failed',
      error: error,
    }
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

export function likePost(id, csrfToken) {
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
          post_id: id,
          liked: true,
          disliked: false,
        }),
      }
      const response = await fetch('/like', params)
      return response.ok
    } catch (error) {}
  }
}

export function dislikePost(id, csrfToken) {
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
          post_id: id,
          liked: false,
          disliked: true,
        }),
      }
      const response = await fetch('/dislike', params)
      return response.ok
    } catch (error) {}
  }
}

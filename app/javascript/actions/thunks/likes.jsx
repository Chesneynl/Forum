import { setLikes } from '../../actions'

export function fetchLikes() {
  return async function(dispatch) {
    try {
      const response = await fetch('/api/v1/likes-and-dislikes')
      const likes = await response.json()
      dispatch(setLikes(likes))
    } catch (error) {}
  }
}

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
      const response = await fetch('/api/v1/like-dislike', params).then(response => {
        if (response.ok) {
          dispatch(fetchLikes())
        }
      })

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
      const response = await fetch('/api/v1/like-dislike', params).then(response => {
        if (response.ok) {
          dispatch(fetchLikes())
        }
      })

      return response.ok
    } catch (error) {}
  }
}

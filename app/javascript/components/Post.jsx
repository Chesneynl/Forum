import React from 'react'
import Container from './ui/Container'

function Post(props) {
  const { post } = props

  const addHtmlEntities = str => {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  }

  const deletePost = () => {
    const url = `/api/v1/destroy/${post.id}`
    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(() => props.history.push('/'))
      .catch(error => console.log(error.message))
  }

  const postDescription = addHtmlEntities(post.description)

  return (
    <>
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img src={`${post.attachment}`} />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">{post.name}</h1>
      </div>
      <Container>
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {post.description}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${postDescription}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger" onClick={deletePost}>
              Delete Post
            </button>
          </div>
        </div>
        <a href="/" className="btn btn-link">
          Back to posts
        </a>
      </Container>
    </>
  )
}

export default Post

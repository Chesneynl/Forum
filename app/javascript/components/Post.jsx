import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../../assets/stylesheets/application.css'

function Post(props) {
  const { post } = props

  const addHtmlEntities = str => {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  }

  const deleteRecipe = () => {
    const url = `/api/v1/destroy/${id}`
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
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img src={post.image} alt={`${post.name} image`} className="img-fluid position-absolute" />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">{post.name}</h1>
      </div>
      <div className="container py-5">
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
            <button type="button" className="btn btn-danger" onClick={deleteRecipe}>
              Delete Recipe
            </button>
          </div>
        </div>
        <a href="/" className="btn btn-link">
          Back to recipes
        </a>
      </div>
    </div>
  )
}

export default Post

import React from 'react'
import { Link } from 'react-router-dom'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = { post: { description: '' } }

    this.addHtmlEntities = this.addHtmlEntities.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props

    const url = `/api/v1/show/${id}`

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => this.setState({ post: response }))
      .catch(() => this.props.history.push('/posts'))
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  }

  deleteRecipe() {
    const {
      match: {
        params: { id },
      },
    } = this.props
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
      .then(() => this.props.history.push('/posts'))
      .catch(error => console.log(error.message))
  }

  render() {
    const { post } = this.state
    let ingredientList = 'No ingredients available'

    if (post.description.length > 0) {
      ingredientList = post.description.split(',').map((ingredient, index) => (
        <li key={index} className="list-group-item">
          {ingredient}
        </li>
      ))
    }
    const postInstruction = this.addHtmlEntities(post.description)

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={post.image}
            alt={`${post.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">{post.name}</h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${postInstruction}`,
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteRecipe}>
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to="/posts" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    )
  }
}

export default Post

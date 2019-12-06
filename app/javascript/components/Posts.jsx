import React from 'react'
import { Link } from 'react-router-dom'

class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    const url = '/api/v1/posts/index'
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => this.setState({ posts: response }))
      .catch(() => this.props.history.push('/'))
  }
  render() {
    const { posts } = this.state
    const allposts = posts.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img src={recipe.image} className="card-img-top" alt={`${recipe.name} image`} />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <Link to={`/post/${recipe.id}`} className="btn custom-button">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    ))
    const noEmpty = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No posts yet. Why not <Link to="/new_post">create one</Link>
        </h4>
      </div>
    )

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">posts for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular posts, our latest additions, and our editor’s
              picks, so there’s sure to be something tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/post" className="btn custom-button">
                Create New Recipe
              </Link>
            </div>
            <div className="row">{posts.length > 0 ? allposts : noEmpty}</div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    )
  }
}
export default Posts

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const url = '/api/v1/posts/index'
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => setPosts(response))
      .catch(() => props.history.push('/'))
  }, [])

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
        No posts yet. Why not <Link to="/create-post">create one</Link>
      </h4>
    </div>
  )

  return (
    <>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/create-post" className="btn custom-button">
              Create new post
            </Link>
            <Link to="/register" className="btn custom-button">
              Register
            </Link>
            <Link to="/login" className="btn custom-button">
              Login
            </Link>
          </div>
          <div className="row">{posts.length > 0 ? allposts : noEmpty}</div>
        </main>
      </div>
    </>
  )
}
export default Home

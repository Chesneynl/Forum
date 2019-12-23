import React, { useState, useEffect } from 'react'

const Posts = props => {
  const { posts } = props

  const allposts = posts.map((recipe, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img src={recipe.image} className="card-img-top" alt={`${recipe.name} image`} />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <a href={`/post/${recipe.id}`} className="btn custom-button">
            View Recipe
          </a>
        </div>
      </div>
    </div>
  ))
  const noEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No posts yet. Why not <a a="/create-post">create one</a>
      </h4>
    </div>
  )

  return (
    <>
      <div className="py-5">
        <main className="container">
          <div className="row">{posts.length > 0 ? allposts : noEmpty}</div>
        </main>
      </div>
    </>
  )
}
export default Posts

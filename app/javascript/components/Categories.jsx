import React from 'react'

const Categories = props => {
  const { categories } = props

  const allcategories = categories.map((post, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img src={`${post.attachment}`} />
        <div className="card-body">
          <h5 className="card-title">{post.name}</h5>
          <a href={`/post/${post.id}`} className="btn custom-button">
            View post
          </a>
        </div>
      </div>
    </div>
  ))
  const noEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No categories yet. Why not <a href="/account/create-post">create one</a>
      </h4>
    </div>
  )

  return (
    <>
      <div className="py-5">
        <main className="container">
          <div className="row">{categories.length > 0 ? allcategories : noEmpty}</div>
        </main>
      </div>
    </>
  )
}
export default Categories

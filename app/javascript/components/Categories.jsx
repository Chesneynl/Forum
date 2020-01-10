import React from 'react'

const Categories = props => {
  const { categories } = props

  const allcategories = categories.map((category, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img src={`${category.attachment}`} />
        <div className="card-body">
          <h5 className="card-title">{category.name}</h5>
          <a href={`/category/${category.id}`} className="btn custom-button">
            View category
          </a>
        </div>
      </div>
    </div>
  ))
  const noEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No categories yet. Why not <a href="/account/create-category">create one</a>
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

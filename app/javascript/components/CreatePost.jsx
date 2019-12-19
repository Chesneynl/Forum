import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CreatePost(props) {
  const [post, setPost] = useState({ name: '', description: '', image: '' })

  const stripHtmlEntities = str => {
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  const onChange = event => {
    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/api/v1/posts/create'
    const { name, description, image } = post

    if (name.length == 0 || description.length == 0 || image.length == 0) return

    const body = {
      name,
      description: description.replace(/\n/g, '<br> <br>'),
      image,
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(response => props.history.push(`/post/${response.id}`))
      .catch(error => console.log(error.message))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Create a new post</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">Type</label>
              <select name="post_type" className="form-control">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="recipeDescription">tags</label>
              <input
                type="text"
                name="description"
                className="form-control"
                required
                onChange={onChange}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="image">Description</label>
            <textarea className="form-control" name="image" rows="5" onChange={onChange} />
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost

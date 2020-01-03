import React, { useState } from 'react'

function CreatePost(props) {
  const [post, setPost] = useState({ name: '', description: '' })
  const [attachment, setAttachment] = useState()

  const stripHtmlEntities = str => {
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  const onChange = event => {
    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const onFileSelect = event => {
    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onload = function(upload) {
      setAttachment(upload.target.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/api/v1/posts/create'
    const { name, description } = post

    console.log(name.length)
    console.log(description.length)
    console.log(attachment)

    if (name.length == 0 || description.length == 0) return
    console.log('binnen')

    const body = {
      name,
      attachment,
      description: description.replace(/\n/g, '<br> <br>'),
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
      .then(response => console.log(response))
      .catch(error => console.log(error.message))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="mb-5">Create a new post</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="post_type" className="form-control">
                <option value="volvo">Image</option>
                <option value="saab">Youtube URL</option>
                <option value="mercedes">GIF</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/*" name="attachment" onChange={onFileSelect}></input>
            </div>
            <label>Description</label>
            <textarea className="form-control" name="description" rows="5" onChange={onChange} />
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

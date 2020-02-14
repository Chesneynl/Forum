import React, { useState } from 'react'
import { SideBar } from '../admin'
import Container from '../ui/Container'

export function CreateCategory() {
  const [post, setPost] = useState({ name: '', description: '' })
  const [image, setImage] = useState()

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
      setImage(upload.target.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/admin/create-category'
    const { name, description } = post

    if (name.length == 0 || description.length == 0) return

    const body = {
      name,
      image,
      description: stripHtmlEntities(description.replace(/\n/g, '<br> <br>')),
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
    <Container>
      <div className="col-sm-12 col-lg-3">
        <SideBar />
      </div>
      <div className="col-sm-12 col-lg-9">
        <h1 className="mb-5">Create a new category</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="form-control" required onChange={onChange} />
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
            <input type="file" accept="image/*" name="image" onChange={onFileSelect}></input>
          </div>
          <label>Description</label>
          <textarea className="form-control" name="description" rows="5" onChange={onChange} />
          <button type="submit" className="btn custom-button mt-3">
            Create Recipe
          </button>
        </form>
      </div>
    </Container>
  )
}

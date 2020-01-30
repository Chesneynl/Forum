import React, { useState, useEffect } from 'react'
import { createPost } from '../../actions/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../actions/thunks'

const CreatePost = () => {
  const categories = useSelector(state => state.posts.categories)
  const postCreated = useSelector(state => state.posts.postCreated)
  const [post, setPost] = useState({ name: '', description: '', posts_categories_id: null })
  const [attachment, setAttachment] = useState()
  const dispatch = useDispatch()

  console.log(postCreated)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

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
    const { name, description, posts_categories_id } = post

    //if (name.length == 0 || description.length == 0) return

    const stripHtmlEntities = str => {
      return String(str)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }

    const token = document.querySelector('meta[name="csrf-token"]').content

    const createdPost = dispatch(
      createPost(
        name,
        parseInt(posts_categories_id),
        attachment,
        stripHtmlEntities(description),
        token,
      ),
    )

    console.log(createdPost)
  }

  const allCategories = categories.map((category, index) => (
    <option key={index} value={category.id}>
      {category.name}
    </option>
  ))

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="mb-5">Create a new post</h1>
          {!postCreated ? (
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
                <label>Category</label>
                <select name="posts_categories_id" className="form-control" onChange={onChange}>
                  {allCategories}
                </select>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="attachment"
                  onChange={onFileSelect}
                ></input>
              </div>
              <label>Description</label>
              <textarea className="form-control" name="description" rows="5" onChange={onChange} />
              <button type="submit" className="btn custom-button mt-3">
                Create Recipe
              </button>
            </form>
          ) : (
            <>Post has been created.</>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreatePost

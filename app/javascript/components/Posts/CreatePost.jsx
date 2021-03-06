import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../actions/thunks'
import { TextInput, SubmitButton, TextArea, SelectField } from '../form'

export function CreatePost() {
  const categories = useSelector(state => state.posts.categories)
  const [post, setPost] = useState({ name: '', description: '', posts_categories_id: null })
  const [postCreated, setPostCreated] = useState(false)
  const [attachment, setAttachment] = useState()
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

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

    const url = '/api/v1/posts/create'
    const token = document.querySelector('meta[name="csrf-token"]').content
    const { name, description, posts_categories_id } = post

    function stripHtmlEntities(str) {
      return String(str)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }

    const body = {
      name,
      description: stripHtmlEntities(description),
      attachment,
      posts_categories_id,
    }

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
      .then(response => {
        setErrors(response.errors)
      })
      .catch(error => console.log(error))
  }

  const allCategories = categories.map((category, index) => (
    <option key={index} value={category.id}>
      {category.name}
    </option>
  ))

  return (
    <>
      <h1 className="mb-5">Create a new post</h1>
      {!postCreated ? (
        <form onSubmit={onSubmit}>
          <TextInput
            type={'text'}
            error={errors.name}
            name={'name'}
            value={post.name}
            onChange={onChange}
            placeholder={'Name'}
          />
          <SelectField options={options} />
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
          <div className="form-group">
            <label>Category</label>
            <select name="posts_categories_id" className="form-control" onChange={onChange}>
              {allCategories}
            </select>
          </div>
          <TextArea
            error={errors.name}
            name={'description'}
            value={post.description}
            onChange={onChange}
            placeholder={'Description'}
          />
          <SubmitButton name={'Create post'} />
        </form>
      ) : (
        <>Post has been created.</>
      )}
    </>
  )
}

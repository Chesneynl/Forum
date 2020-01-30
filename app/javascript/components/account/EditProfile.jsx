import React, { useState } from 'react'

const EditProfile = props => {
  const { currentUser } = props
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState(currentUser)

  const onChange = event => {
    setErrors({})
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/register'
    const { email, username, password, password_repeat } = user

    if ((email.length == 0 || username.length == 0 || password.length == 0, password_repeat == 0))
      return

    const body = {
      email,
      username,
      password,
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
      .then(response => setErrors(response.errors))
      .catch(error => console.log(error))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit profile</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                required
                onChange={onChange}
                value={user.email}
              />
              {errors.email ? <div className="form-field-error">{errors.email}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                required
                value={user.username}
                onChange={onChange}
              />
              {errors.username ? <div className="form-field-error">{errors.username}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="recipeDescription">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeDescription">Repeat password</label>
              <input
                type="password"
                name="password_repeat"
                className="form-control"
                required
                onChange={onChange}
              />
              {errors.password ? <div className="form-field-error">{errors.password}</div> : null}
              <small className="form-text text-muted">
                Repeat your password to check for spelling errors
              </small>
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile

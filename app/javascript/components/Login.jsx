import React, { useState } from 'react'

function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' })
  const [response, setRespoonse] = useState({})

  const onChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/login'
    const { email, password } = user

    if (email.length == 0 || password.length == 0) return

    const body = {
      email,
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
      .then(response => {
        setRespoonse(response)
        if (!response.errors) {
          props.history.push('/')
        }
      })
      .catch(error => console.log(error))
  }

  const renderForm = (
    <>
      <h1 className="font-weight-normal mb-5">Register</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="recipeName">Email</label>
          <input type="text" name="email" className="form-control" required onChange={onChange} />
          {response.errors && response.errors.email ? (
            <div className="form-field-error">{response.errors.email}</div>
          ) : null}
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
        <button type="submit" className="btn btn-success mt-3">
          Login
        </button>
      </form>
    </>
  )

  const isLoggedIn = (
    <>
      <div className="form-field-error">U bent al ingelogd.</div>
    </>
  )

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          {response.errors && response.errors.doesnt_exists ? (
            <div className="form-field-error">{response.errors.doesnt_exists}</div>
          ) : null}
          {response.success && response.success.isLoggedIn ? isLoggedIn : renderForm}
        </div>
      </div>
    </div>
  )
}

export default Login

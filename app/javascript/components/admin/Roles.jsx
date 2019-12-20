import React, { useState } from 'react'

function Roles(props) {
  const { roles } = props
  const [role, setRole] = useState({ name: '' })
  const [response, setResponse] = useState({})

  console.log(response)

  const onChange = event => {
    setRole({ ...role, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/admin/roles'
    const { name } = role

    if (name.length == 0) return

    const body = {
      name,
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
      })
      .then(response => setResponse(response))
      .catch(error => console.log(error.message))
  }

  const deleteRole = id => {
    const url = `/admin/roles/${id}`
    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => setResponse(response))
      .catch(error => console.log(error.message))
  }

  const allroles = roles.map((role, index) => (
    <div key={index} className="col-sm-12">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{role.name}</h5>
          <a href="" onClick={() => deleteRole(role.id)} className="btn btn-danger">
            Delete Recipe
          </a>
        </div>
      </div>
    </div>
  ))
  const onEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>No roles yet.</h4>
    </div>
  )

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          {response && response.success && response.action === 'create' && (
            <div className="alert alert-success" role="alert">
              Role: {response.role.name} has been successfully created
            </div>
          )}
          {response && response.errors && response.action === 'create' && (
            <div className="alert alert-danger" role="alert">
              {response.errors.name}
            </div>
          )}
          <div className="row">{roles.length > 0 ? allroles : onEmpty}</div>
          <h1 className="font-weight-normal mb-5">Create a new role</h1>
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
            <button type="submit" className="btn custom-button mt-3">
              Create Role
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Roles

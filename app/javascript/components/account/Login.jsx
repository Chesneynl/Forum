import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { TextInput } from '../form/TextInput'
import { SubmitButton } from '../form/SubmitButton'

export function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' })
  const [response, setRespoonse] = useState({})
  const [errors, setErrors] = useState({})

  const onChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/login'

    const { email, password } = user

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
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => {
        setRespoonse(response)
        console.log(response)
        setErrors(response.errors)
        if (response.success) {
          return <Redirect to="/" />
        }
      })
      .catch(error => console.log(error))
  }

  const renderForm = (
    <>
      <h1 className="font-weight-normal mb-5">Login</h1>
      <form onSubmit={onSubmit}>
        <TextInput
          type={'text'}
          error={''}
          name={'email'}
          value={user.email}
          onChange={onChange}
          placeholder={'E-mail address'}
        />
        <TextInput
          type={'Password'}
          error={''}
          name={'password'}
          value={user.password}
          onChange={onChange}
          placeholder={'Password'}
        />
        <SubmitButton name={'Login'} />
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

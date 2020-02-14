import React, { useState } from 'react'
import { TextInput } from '../form/TextInput'
import { SubmitButton } from '../form/SubmitButton'
import { InfoMessage } from '../ui'

export function Login(props) {
  const currentUser = props.user
  const [user, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

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
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => {
        if (response.success) {
          setLoggedIn(true)
        } else [setErrors(response.errors)]
      })
      .catch(error => console.log(error))
  }

  const renderForm = (
    <>
      <h1 className="font-weight-normal mb-5">Login</h1>
      <form onSubmit={onSubmit}>
        <TextInput
          type={'text'}
          error={errors && errors.email}
          name={'email'}
          value={user.email}
          onChange={onChange}
          placeholder={'E-mail address'}
        />
        <TextInput
          type={'Password'}
          error={(errors && errors.password) || errors.doesnt_exists}
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
      <div className="form-field-error">You are already logged in..</div>
    </>
  )

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          {loggedIn && <InfoMessage>You're now logged in.</InfoMessage>}
          {currentUser && isLoggedIn}
          {!currentUser && !loggedIn ? renderForm : <div></div>}
        </div>
      </div>
    </div>
  )
}

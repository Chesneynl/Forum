import React, { useState } from 'react'

import { TextInput } from '../form/TextInput'
import { SubmitButton } from '../form/SubmitButton'

export function Register() {
  const [user, setUser] = useState({ email: '', username: '', password: '', password_repeat: '' })
  const [errors, setErrors] = useState({})

  const onChange = event => {
    setErrors({})
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/register'
    const { email, username, password, password_repeat } = user

    const body = {
      email,
      username,
      password,
      password_repeat,
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
        console.log(response.errors)
        setErrors(response.errors)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Register</h1>
          <form onSubmit={onSubmit}>
            <TextInput
              type={'text'}
              error={errors.email}
              name={'email'}
              placeholder={'E-mail address'}
            />
            <TextInput
              type={'text'}
              error={errors.username}
              name={'username'}
              placeholder={'Username'}
            />
            <TextInput
              type={'password'}
              error={errors.password}
              name={'password'}
              placeholder={'Password'}
            />
            <TextInput
              type={'password'}
              error={errors.password}
              name={'password'}
              placeholder={'Repeat password'}
            />

            <SubmitButton name={'Register'} />
          </form>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'

import { TextInput, SubmitButton } from '../form'
import { InfoMessage, Heading2 } from '../ui'

export function Register() {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    password_repeat: '',
  })
  const [errors, setErrors] = useState({})
  const [registerd, setRegisterd] = useState(false)

  const onChange = event => {
    setErrors({ ...errors, [event.target.name]: null })
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
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => {
        if (response.success) {
          setRegisterd(true)
        } else {
          setErrors(response.errors)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Heading2>Register</Heading2>
      {registerd ? (
        <InfoMessage>You are succesfully registered.</InfoMessage>
      ) : (
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
            type={'text'}
            error={errors && errors.username}
            name={'username'}
            value={user.username}
            onChange={onChange}
            placeholder={'Username'}
          />
          <TextInput
            type={'password'}
            error={errors && errors.password}
            value={user.password}
            onChange={onChange}
            name={'password'}
            placeholder={'Password'}
          />
          <TextInput
            type={'password'}
            onChange={onChange}
            error={errors && errors.password}
            value={user.password_repeat}
            name={'password_repeat'}
            placeholder={'Repeat password'}
          />

          <SubmitButton name={'Register'} />
        </form>
      )}
    </>
  )
}

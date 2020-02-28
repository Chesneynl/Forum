import React, { useState } from 'react'
import { TextInput } from '../form/TextInput'
import { SubmitButton } from '../form/SubmitButton'
import { InfoMessage, Heading2 } from '../ui'

export function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' })
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
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => {
        if (response && response.errors) {
          setErrors(response.errors)
          console.log(response)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Heading2>Login</Heading2>
      <form onSubmit={onSubmit}>
        <TextInput
          type={'text'}
          error={errors && errors.doesnt_exists}
          name={'email'}
          value={user.email}
          onChange={onChange}
          placeholder={'E-mail address'}
        />
        <TextInput
          type={'Password'}
          error={errors && errors.doesnt_exists}
          name={'password'}
          value={user.password}
          onChange={onChange}
          placeholder={'Password'}
        />
        <SubmitButton name={'Login'} />
      </form>
    </>
  )
}

import React, { useState } from 'react'
import { TextInput } from '../form/TextInput'
import { SubmitButton } from '../form/SubmitButton'
import { InfoMessage, Heading2 } from '../ui'
import { Redirect } from 'react-router-dom'

export function Login(props) {
  const [userLogin, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const onChange = event => {
    setUser({ ...userLogin, [event.target.name]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = '/login'

    const { email, password } = userLogin

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
        } else if (response && response.success) {
          setLoggedIn(true)
        }
      })
      .catch(error => console.log(error))
  }

  // console.log(userLogin)

  // if (userLogin && loggedIn)
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/',
  //         state: 'Please sign in',
  //       }}
  //     />
  //   )

  return (
    <>
      <Heading2>Login</Heading2>
      <form onSubmit={onSubmit}>
        <TextInput
          type={'text'}
          error={errors && errors.doesnt_exists}
          name={'email'}
          value={userLogin.email}
          onChange={onChange}
          placeholder={'E-mail address'}
        />
        <TextInput
          type={'Password'}
          error={errors && errors.doesnt_exists}
          name={'password'}
          value={userLogin.password}
          onChange={onChange}
          placeholder={'Password'}
        />
        <SubmitButton name={'Login'} />
      </form>
    </>
  )
}

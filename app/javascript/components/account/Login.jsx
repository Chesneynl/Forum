import React, { useState } from 'react'
import { TextInput } from '../form/TextInput'
import { SubmitButton } from '../form/SubmitButton'
import { Heading2 } from '../ui'
import { Redirect } from 'react-router-dom'
import { setUser } from '../../actions'
import { useDispatch } from 'react-redux'

export function Login(props) {
  const [userLogin, setUserLogin] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const dispatch = useDispatch()

  const onChange = event => {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value })
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
          dispatch(setUser(response.user))
          localStorage.setItem('message', 'Succesully logged in.')
        }
      })
      .catch(error => console.log(error))
  }

  if (userLogin && loggedIn) return <Redirect to="/" />

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

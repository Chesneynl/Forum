import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  color: red;
`

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    background: #0053ba;
  }
`

export function SubmitButton(props) {
  const { name } = props
  return (
    <Base>
      <Button>{name}</Button>
    </Base>
  )
}

export default SubmitButton

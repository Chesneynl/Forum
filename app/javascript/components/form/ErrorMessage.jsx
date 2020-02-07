import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  color: red;
`

export function ErrorMessage(props) {
  const { children } = props
  return <Base>{children}</Base>
}

export default ErrorMessage

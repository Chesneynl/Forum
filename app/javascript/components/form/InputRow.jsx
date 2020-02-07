import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.gutters.small};
`

export function InputRow(props) {
  const { children } = props
  return <Base>{children}</Base>
}

export default InputRow

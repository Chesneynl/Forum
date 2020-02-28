import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  padding: 10px 10px;
  background: ${props => props.theme.colors.success};
  width: 100%;
  color: #fff;
  border-radius: 5px;
`

export const InfoMessage = props => {
  const { children } = props
  return <Base>{children}</Base>
}

export default InfoMessage

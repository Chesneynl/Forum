import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  padding: ${props => props.theme.gutters.small} ${props => props.theme.gutters.medium};
  color: ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.fadedSuccess};
  box-shadow: 0 0 0 1px ${props => props.theme.colors.success} inset, 0 0 0 0 transparent;
  margin-bottom: ${props => props.theme.gutters.medium};
  width: 100%;
  border-radius: 5px;
  font-size: ${props => props.theme.typography.fontSizes.medium};
`

export const InfoMessage = props => {
  const { children } = props
  return <Base>{children}</Base>
}

export default InfoMessage

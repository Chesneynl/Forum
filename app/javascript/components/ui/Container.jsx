import React from 'react'
import styled from 'styled-components'

const BaseContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

export const Container = props => {
  const { children } = props
  return <BaseContainer>{children}</BaseContainer>
}

export const TwoCol = props => {
  const { children } = props
  return <div className="container mt-6">{children}</div>
}

export default Container

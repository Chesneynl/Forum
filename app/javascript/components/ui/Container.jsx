import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const Container = props => {
  const { children } = props
  return <Base>{children}</Base>
}
export default Container

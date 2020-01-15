import React from 'react'
import styled from 'styled-components'

const Container = styled.a`
  position: relative;
  padding: 8px 20px 6px;
  float: left;
  border-radius: 10px;
  font-size: 17px;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  background-color: #82bf56;
  border-bottom: 3px solid #669644;
  text-shadow: 0px -2px #669644;

  &:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    border-bottom: 1px solid;
  }
`

export const Button = props => {
  const { children } = props

  return <Container>{children}</Container>
}

export default Button

import React from 'react'
import styled from 'styled-components'

const Link = props => {
  const { name, to } = props

  const StyledLi = styled.li`
    list-style: none;
  `

  const Link = styled.a`
    text-decoration: none;
    color: #000;

    &:hover {
      color: #06aeed;
    }
  `

  return (
    <StyledLi>
      <Link href={to}>{name}</Link>
    </StyledLi>
  )
}
export default Link

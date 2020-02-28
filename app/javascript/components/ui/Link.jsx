import React from 'react'
import styled from 'styled-components'

export const Link = props => {
  const { name, to } = props

  const StyledLi = styled.li`
    list-style: none;
  `

  const Link = styled.a`
    text-decoration: none;
    color: ${props => props.theme.colors.primary};

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

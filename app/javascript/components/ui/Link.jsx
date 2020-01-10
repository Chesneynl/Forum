import React from 'react'
import styled from 'styled-components'

const Link = props => {
  const { name, to } = props

  const StyledLi = styled.li`
    list-style: none;
  `

  return (
    <StyledLi className="nav-item">
      <a href={to}>{name}</a>
    </StyledLi>
  )
}
export default Link

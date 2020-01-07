import React from 'react'

const Link = props => {
  const { name, to } = props

  return (
    <li className="nav-item">
      <a href={to}>{name}</a>
    </li>
  )
}
export default Link

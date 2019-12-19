import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const Link = props => {
  const { name, to, currentPath } = props
  const assignedClass = currentPath === to ? 'nav-link active' : 'nav-link'

  return (
    <li className="nav-item">
      <a className={assignedClass} href={to}>
        {name}
      </a>
    </li>
  )
}
export default Link

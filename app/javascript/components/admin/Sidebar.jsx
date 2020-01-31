import React from 'react'
import Link from '../ui/Link'

export function SideBar() {
  return (
    <>
      <ul className="list-group">
        <Link name="Approve posts" to="/admin/posts" />
        <Link name="Create category" to="/admin/create-category" />
      </ul>
    </>
  )
}

export default SideBar

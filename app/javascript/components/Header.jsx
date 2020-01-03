import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  background: #fff;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

function Header(props) {
  const { path, user, userIsAdmin } = props

  return (
    <Base>
      <Container>
        <a className="logo" href="/">
          Navbar
        </a>
        <div>
          <ul>
            <li>
              <a href="/categories">Categories</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <ul>
              {userIsAdmin && (
                <li>
                  <a href="/admin/roles">Admin panel</a>
                </li>
              )}
              {!user ? (
                <>
                  <a href="/register">Register</a>
                  <a href="/login">Login</a>
                </>
              ) : (
                <>
                  <li>
                    <a href="#">{user.username}</a>
                    <ul>
                      <a href="/account/my-posts">My posts</a>
                      <a href="/account/create-post">Create post</a>
                      <a href="/account/edit-profile">Account settings</a>
                    </ul>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                </>
              )}
            </ul>
            <input type="search" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </div>
      </Container>
    </Base>
  )
}
export default Header

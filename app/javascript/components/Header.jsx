import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  background: #fff;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const MenuItem = styled.li`
  display: inline-block;
  position: relative;
  margin-left: 20px;
  list-style: none;
`

const MenuItemLink = styled.a`
  text-decoration: none;
  color: #000;

  &;hover {
    color:red;
  }
`

const Submenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  list-style: none;

  ${MenuItem}:hover & {
    display: block;
  }
`

const SubmenuItem = styled.li``

function Header(props) {
  const { user, userIsAdmin } = props

  return (
    <Base>
      <Container>
        <siv className="logo" href="/">
          Navbar
        </siv>
        <ul>
          <MenuItem>
            <MenuItemLink href="/categories">Categories</MenuItemLink>
          </MenuItem>
          {userIsAdmin && (
            <MenuItem>
              <MenuItemLink href="/admin/posts">Admin panel</MenuItemLink>
            </MenuItem>
          )}
          {!user ? (
            <>
              <MenuItemLink href="/register">Register</MenuItemLink>
              <MenuItemLink href="/login">Login</MenuItemLink>
            </>
          ) : (
            <>
              <MenuItem>
                <MenuItemLink href="#">{user.username}</MenuItemLink>
                <Submenu>
                  <SubmenuItem>
                    <MenuItemLink href="/account/my-posts">My posts</MenuItemLink>
                  </SubmenuItem>
                  <SubmenuItem>
                    <MenuItemLink href="/account/create-post">Create post</MenuItemLink>
                  </SubmenuItem>
                  <SubmenuItem>
                    <MenuItemLink href="/account/edit-profile">Account settings</MenuItemLink>
                  </SubmenuItem>
                </Submenu>
              </MenuItem>
              <MenuItem>
                <MenuItemLink href="/logout">Logout</MenuItemLink>
              </MenuItem>
            </>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input type="search" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </Container>
    </Base>
  )
}
export default Header

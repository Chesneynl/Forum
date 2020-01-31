import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from './ui'

const Base = styled.div`
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 4px 2px -2px #cacaca;
  margin-bottom: 50px;
`

const BaseTopBar = styled.div`
  padding: 5px 0;
  background-color: #c0392b;
  text-align: right;
  font-size: 14px;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1024px;
`

const MenuItem = styled.li`
  display: inline-block;
  position: relative;
  margin-left: 20px;
  list-style: none;
  padding-bottom: 5px;

  &:hover {
    color: #06aeed;
  }
`

const MenuItemLink = styled.a`
  text-decoration: none;
  color: #000;

  &;hover {
    color: red;
  }
`

const Submenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  list-style: none;
  z-index: 100;
  white-space: nowrap;
  background: #fff;
  padding-top: 10px;
  padding-bottom: 20px;

  ${MenuItem}:hover & {
    display: block;
  }
`

const SubmenuItem = styled.li``

export const Header = props => {
  const { user, userIsAdmin } = props

  return (
    <>
      <BaseTopBar>
        <Container>
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
        </Container>
      </BaseTopBar>
      <Base>
        <StyledContainer>
          <a className="logo" href="/">
            Logo
          </a>
          <ul>
            <MenuItem>
              <MenuItemLink href="/trennding">Trending</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink href="/categories">Categories</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink href="/New">New</MenuItemLink>
            </MenuItem>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input type="search" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </StyledContainer>
      </Base>
    </>
  )
}

export default Header

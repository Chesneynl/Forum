import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from './ui'
import { logout } from '../actions/thunks'

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

const MenuItemLink = styled(NavLink)`
  text-decoration: none;
  color: #000;

  &;hover,
  &.active {
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
  const { user } = props
  const dispatch = useDispatch()

  function logoutClick(e) {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <>
      <BaseTopBar>
        <Container>
          {user && user.admin && (
            <MenuItem>
              <MenuItemLink to="/admin/check-posts">Admin panel</MenuItemLink>
            </MenuItem>
          )}
          {!user ? (
            <>
              <MenuItemLink to="/register">Register</MenuItemLink>
              <MenuItemLink to="/login">Login</MenuItemLink>
            </>
          ) : (
            <>
              <MenuItem>
                <MenuItemLink to="/account/my-posts">{user.username}</MenuItemLink>
                <Submenu>
                  <SubmenuItem>
                    <MenuItemLink to="/account/my-posts">My posts</MenuItemLink>
                  </SubmenuItem>
                  <SubmenuItem>
                    <MenuItemLink to="/account/create-post">Create post</MenuItemLink>
                  </SubmenuItem>
                  <SubmenuItem>
                    <MenuItemLink to="/account/edit-profile">Account settings</MenuItemLink>
                  </SubmenuItem>
                </Submenu>
              </MenuItem>
              <MenuItem>
                <MenuItemLink to="/logout" onClick={e => logoutClick(e)}>
                  Logout
                </MenuItemLink>
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
              <MenuItemLink to="/trennding">Trending</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/categories">Categories</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/New">New</MenuItemLink>
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

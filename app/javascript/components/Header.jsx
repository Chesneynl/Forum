import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../actions/thunks'

const MainContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
`

const Logo = styled.div`
  width: 20px;

  img {
    width: 100%;
  }
`

const AdminPanel = styled.div`
  position: absolute;
  left: 0;
  top: 100%;

  a {
    display: block;
    text-decoration: none;
    color: #fff;
    background-color: ${props => props.theme.colors.primary};
    padding: ${props => props.theme.gutters.small} ${props => props.theme.gutters.medium};
  }
`

const Base = styled.div`
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 4px 2px -2px #cacaca;
`

const BaseTopBar = styled.div`
  background-color: ${props => props.theme.colors.primary};
  text-align: right;
  height: 5px;
  font-size: 14px;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1024px;
  position: relative;
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

  &:hover,
  &.active {
    color: ${props => props.theme.colors.primary};
  }
`

const Submenu = styled.ul`
  text-align: right;
  right: 0;
  display: none;
  position: absolute;
  top: 100%;
  list-style: none;
  z-index: 100;
  white-space: nowrap;
  width: 175px;
  padding-top: 10px;
  padding-top: 20px;

  ${MenuItem}:hover & {
    display: block;
  }
`

const SubmenuItem = styled.li`
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-top: 0;

  &:first-child {
    border-top: 1px solid rgba(34, 36, 38, 0.15);
  }

  &:last-child {
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  }

  ${MenuItemLink} {
    background: #fff;
    padding: ${props => props.theme.gutters.small} ${props => props.theme.gutters.medium};
    width: 100%;
    display: block;
  }

  &:hover {
    ${MenuItemLink} {
      background: #fff;
      color: ${props => props.theme.colors.primary};
    }
  }
`

export const Header = props => {
  const user = useSelector(state => state.users.current_user)
  const dispatch = useDispatch()

  function logoutClick(e) {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <MainContainer>
      <BaseTopBar />
      <Base>
        <AdminPanel>
          {user && user.admin && <a href="/admin/check-posts">Admin panel</a>}
        </AdminPanel>
        <StyledContainer>
          <Logo>
            <a className="logo" href="/">
              <img src="/assets/logo.png" />
            </a>
          </Logo>

          <ul>
            <MenuItem>
              <MenuItemLink to="/posts/new">New</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/trennding">Trending</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/categories">Categories</MenuItemLink>
            </MenuItem>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input type="search" placeholder="Search" />
            <button type="submit">Search</button>
          </form>

          {user ? (
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
                <SubmenuItem>
                  <MenuItemLink to="/logout" onClick={e => logoutClick(e)}>
                    Logout
                  </MenuItemLink>
                </SubmenuItem>
              </Submenu>
            </MenuItem>
          ) : (
            <>
              <MenuItemLink to="/register">REGISTER</MenuItemLink>
              <MenuItemLink to="/login">LOGIN</MenuItemLink>
            </>
          )}
        </StyledContainer>
      </Base>
    </MainContainer>
  )
}

export default Header

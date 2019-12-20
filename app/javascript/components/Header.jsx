import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Link from '../components/ui/Link'

const Home = props => {
  const { path, user } = props

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link name="Categories" to="/categories" currentPath={path} />
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <Link name="Admin panel" to="/admin/roles" currentPath={path} />
              {!user ? (
                <>
                  <Link name="Register" to="/register" currentPath={path} />
                  <Link name="Login" to="/login" currentPath={path} />
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.username}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="/account/my-posts">
                        My posts
                      </a>
                      <a className="dropdown-item" href="/account/create-post">
                        Create post
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/account/edit-profile">
                        Account settings
                      </a>
                    </div>
                  </li>

                  <Link name="Logout" to="/logout" currentPath={path} />
                </>
              )}
            </ul>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  )
}
export default Home

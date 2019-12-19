import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import Register from '../components/Register'
import Login from '../components/Login'
import Logout from '../components/Logout'
import Profile from '../components/Profile'

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/post/:id" exact component={Post} />
      <Route path="/create-post" exact component={CreatePost} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/profile" exact component={Profile} />
    </Switch>
  </Router>
)

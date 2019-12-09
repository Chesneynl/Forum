import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import Register from '../components/Register'

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/post/:id" exact component={Post} />
      <Route path="/create-post" exact component={CreatePost} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </Router>
)

import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allRedcuer from '../reducers'
import thunk from 'redux-thunk'
import ThemeProvider from '../ThemeProvider'
import { Posts } from './posts'
import { Container } from './ui'
import { Login, Register, MyPosts, EditProfile } from './account'
import { CreatePost, Categories } from './posts'
import { Header } from './Header'
import { CreateCategory } from './admin'

const App = props => {
  const { user, userIsAdmin } = props

  const store = createStore(allRedcuer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <ThemeProvider theme="defaultTheme">
        <Router>
          <Header user={user} userIsAdmin={userIsAdmin} />
          <Switch>
            <Container>
              <Route exact path="/">
                <Posts postsType={'new'} />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/category/:id">
                <Posts postsType={'category'} />
              </Route>
              <Route path="/account/my-posts">
                <Posts postsType={'my-posts'} />
              </Route>
              <Route path="/account/edit-profile">
                <EditProfile />
              </Route>
              <Route path="/account/create-post">
                <CreatePost />
              </Route>
              <Route path="/admin/check-posts">
                <Posts postsType={'inactive'} />
              </Route>
              <Route path="/admin/create-category">
                <CreateCategory />
              </Route>
            </Container>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App

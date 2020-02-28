import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { getCurrentUser } from '../actions/thunks'
import allRedcuer from '../reducers'
import thunk from 'redux-thunk'
import ThemeProvider from '../ThemeProvider'
import { Posts, Post } from './posts'
import { Container } from './ui'
import { RegisterLogin, MyPosts, EditProfile } from './account'
import { CreatePost, Categories } from './posts'
import { Header } from './Header'
import { CreateCategory, SideBar } from './admin'

function App(props) {
  const user = useSelector(state => state.users.current_user)
  const dispatch = useDispatch()

  function isAdmin() {
    return user && user.admin
  }

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  return (
    <ThemeProvider theme="defaultTheme">
      <Router>
        <Header user={user} />
        <Switch>
          <Container>
            <Route exact path="/">
              <Posts postsType={'new'} user={user} />
            </Route>
            <Route path="/login">{user ? <Redirect to="/" /> : <RegisterLogin />}</Route>
            <Route path="/register">{user ? <Redirect to="/" /> : <RegisterLogin />}</Route>

            <Route path="/post/:id">
              <Post />
            </Route>

            <Route path="/posts/new">
              <Posts postsType={'new'} user={user} />
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
              {user ? <CreatePost /> : <Redirect to="/login" />}
            </Route>

            <Route path="/admin/check-posts">
              {isAdmin() ? (
                <>
                  <SideBar />
                  <Posts postsType={'inactive'} user={user} />
                </>
              ) : (
                <Redirect to="/login" />
              )}
              <SideBar />
            </Route>
            <Route path="/admin/create-category">
              <CreateCategory />
            </Route>
          </Container>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

function AppContainer(props) {
  const store = createStore(allRedcuer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppContainer

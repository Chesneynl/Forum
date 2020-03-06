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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  return (
    <ThemeProvider theme="defaultTheme">
      <Router>
        <Header />
        <Switch>
          <Container>
            <Route exact path="/">
              <Posts postsType={'new'} />
            </Route>
            <Route path="/login">
              <RegisterLogin />
            </Route>
            <Route path="/register">
              <RegisterLogin />
            </Route>

            <Route path="/post/:id">
              <Post />
            </Route>

            <Route path="/posts/new">
              <Posts postsType={'new'} />
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
              <SideBar />
              <Posts postsType={'inactive'} />
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

import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allRedcuer from '../../reducers'
import PostContent from '../Posts/Post'
import thunk from 'redux-thunk'
import ThemeProvider from '../../ThemeProvider'

const Post = props => {
  const store = createStore(allRedcuer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <ThemeProvider theme="defaultTheme">
        <PostContent post={props.post} />
      </ThemeProvider>
    </Provider>
  )
}

export default Post

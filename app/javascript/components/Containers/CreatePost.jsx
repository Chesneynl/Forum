import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allRedcuer from '../../reducers'
import CreatePostContent from '../Posts/CreatePost'
import thunk from 'redux-thunk'
import ThemeProvider from '../../ThemeProvider'

const CreatePost = props => {
  const store = createStore(allRedcuer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <ThemeProvider theme="defaultTheme">
        <CreatePostContent />
      </ThemeProvider>
    </Provider>
  )
}

export default CreatePost

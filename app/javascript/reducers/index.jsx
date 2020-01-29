import postsReducer from './posts'
import likesReducer from './likes'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  likes: likesReducer,
  posts: postsReducer,
})

export default allReducers

import postsReducer from './posts'
import likesReducer from './likes'
import userReducer from './user'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  likes: likesReducer,
  posts: postsReducer,
  users: userReducer,
})

export default allReducers

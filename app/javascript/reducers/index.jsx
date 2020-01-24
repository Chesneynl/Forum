import postsReducer from './posts'
import likesReducer from './posts'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  likes: likesReducer,
  posts: postsReducer,
})

export default allReducers

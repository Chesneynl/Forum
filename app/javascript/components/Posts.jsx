import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../actions'
import { createStore, applyMiddleware } from 'redux'
import allRedcuer from '../reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Container from './ui/Container'
import LoadingSpinner from './ui/LoadingSpinner'
import Link from './ui/Link'
import styled from 'styled-components'

const PostsContent = () => {
  const posts = useSelector(state => state.posts)
  const isloading = useSelector(state => state.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const onEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No posts yet. Why not <a href="/account/create-post">create one</a>
      </h4>
    </div>
  )

  const Post = styled.div`
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #06aeed;
  `

  const PostTitle = styled.div`
    padding: 15px 0;
    font-size: 24px;
  `

  return (
    <>
      <div>
        <Container>
          {isloading && <LoadingSpinner />}
          {posts.length > 0
            ? posts.map((post, index) => (
                <Post key={index}>
                  <PostTitle>
                    <Link name={post.name} to={`/post/${post.id}`} />
                  </PostTitle>
                  <a href={`/post/${post.id}`}>
                    <img src={`${post.attachment}`} />
                  </a>
                </Post>
              ))
            : onEmpty}
        </Container>
      </div>
    </>
  )
}

const Posts = () => {
  const store = createStore(allRedcuer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <PostsContent />
    </Provider>
  )
}

export default Posts

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, likePost, dislikePost } from '../../actions'
import { Link, LoadingSpinner, Container, Button } from '../ui/'
import styled from 'styled-components'

const Posts = props => {
  const posts = useSelector(state => state.posts.items)
  const likes = useSelector(state => state.likes)
  const isloading = useSelector(state => state.posts.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const Post = styled.div`
    background-color: ${props => props.theme.colors.primary};
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #06aeed;
  `

  const PostTitle = styled.div`
    padding: 15px 0;
    font-size: 24px;
  `

  const onEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No posts yet. Why not <a href="/account/create-post">create one</a>
      </h4>
    </div>
  )

  return (
    <>
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
                <Button
                  active={false}
                  defaultIcon={'fa fa-thumbs-up'}
                  successIcon={'fa fa-heart'}
                  type="primary"
                  onClick={() => dispatch(likePost(post.id))}
                >
                  Like
                </Button>
                <Button
                  active={false}
                  type="secondary"
                  defaultIcon={'fa fa-thumbs-down'}
                  successIcon={'fa fa-sad-tear'}
                  onClick={() => dispatch(dislikePost(post.id))}
                >
                  Dislike
                </Button>
              </Post>
            ))
          : onEmpty}
      </Container>
    </>
  )
}

export default Posts

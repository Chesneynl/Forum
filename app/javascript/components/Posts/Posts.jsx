import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchLikes, likePost, dislikePost } from '../../actions/thunks'
import { Link, LoadingSpinner, Container, Button } from '../ui/'
import styled from 'styled-components'

const Posts = props => {
  const posts = useSelector(state => state.posts.items)
  const likes = useSelector(state => state.likes.items)
  const isloading = useSelector(state => state.posts.isLoading)
  const dispatch = useDispatch()
  const csrfToken = document.querySelector('meta[name=csrf-token]').content

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchLikes())
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
          ? posts.map((post, index) => {
              const liked = likes.some(like => like.liked === true && like.post_id === post.id)
              const disLiked = likes.some(
                like => like.disliked === true && like.post_id === post.id,
              )

              return (
                <Post key={index}>
                  <PostTitle>
                    <Link name={post.name} to={`/post/${post.id}`} />
                  </PostTitle>
                  <a href={`/post/${post.id}`}>
                    <img src={`${post.attachment}`} />
                  </a>
                  <Button
                    active={liked}
                    defaultIcon={'fa fa-thumbs-up'}
                    successIcon={'fa fa-thumbs-up'}
                    type="primary"
                    onClick={() => dispatch(likePost(post.id, csrfToken))}
                  >
                    Like
                  </Button>
                  <Button
                    active={disLiked}
                    type="secondary"
                    defaultIcon={'fa fa-thumbs-down'}
                    successIcon={'fa fa-thumbs-down'}
                    onClick={() => dispatch(dislikePost(post.id))}
                  >
                    Dislike
                  </Button>
                </Post>
              )
            })
          : onEmpty}
      </Container>
    </>
  )
}

export default Posts

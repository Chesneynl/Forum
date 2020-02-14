import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchInActivePosts,
  fetchLikes,
  likePost,
  dislikePost,
} from '../../actions/thunks'
import { Link, LoadingSpinner, Button } from '../ui'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

export function Posts(props) {
  const { user, postsType } = props
  const posts = useSelector(state => state.posts.items)
  const likes = useSelector(state => state.likes.items)
  const isloading = useSelector(state => state.posts.isLoading)
  const dispatch = useDispatch()
  const csrfToken = document.querySelector('meta[name=csrf-token]').content
  const { id } = useParams()

  useEffect(() => {
    switch (postsType) {
      case 'category':
        dispatch(fetchPostsByCategory(id))
        break
      case 'new':
        dispatch(fetchPosts())
        break
      case 'inactive':
        dispatch(fetchInActivePosts())
        break
      case 'my-posts':
        dispatch(fetchPosts())
        break
      default:
        null
    }

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

  const PostFileContainer = styled.div`
    width: 100%;

    img {
      width: 100%;
    }
  `

  const LikeDislikeContainer = styled.div`
    display: flex;
  `

  const onEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No posts yet. Why not <a href="/account/create-post">create one</a>
      </h4>
    </div>
  )

  const setPostActive = id => {
    event.preventDefault()
    const url = `/admin/approve-post/${id}`

    const body = {
      id,
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Network response was not ok.')
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  return (
    <>
      {isloading && <LoadingSpinner />}
      {!isloading && posts.length === 0 && onEmpty}
      {posts.length > 0 &&
        posts.map((post, index) => {
          const liked = likes.some(like => like.liked === true && like.post_id === post.id)
          const disLiked = likes.some(like => like.disliked === true && like.post_id === post.id)

          return (
            <Post key={index}>
              <PostTitle>
                <Link name={post.name} to={`/post/${post.id}`} />
              </PostTitle>
              {!post.active && (
                <a href="#" onClick={() => setPostActive(post.id)}>
                  Approve post
                </a>
              )}

              <PostFileContainer>
                <a href={`/post/${post.id}`}>
                  <img src={`${post.attachment}`} />
                </a>
              </PostFileContainer>
              {user && (
                <LikeDislikeContainer>
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
                </LikeDislikeContainer>
              )}
            </Post>
          )
        })}
    </>
  )
}

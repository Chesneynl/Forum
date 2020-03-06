import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchLikes, likePost, dislikePost } from '../../actions/thunks'
import { Link, LoadingSpinner, Button, Alert } from '../ui'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import { LikeDislikes } from './LikeDislikes'

const Post = styled.div`
  width: 75%;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
  background: #fff;
  margin-bottom: ${props => props.theme.gutters.large};
  box-shadow: 0px 0px 5px 0px rgba(194, 194, 194, 0.75);
`

const PostTitle = styled.div`
  padding-bottom: 15px;
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
  margin-top: ${props => props.theme.gutters.small};
`

export function Posts(props) {
  const { postsType } = props
  const user = useSelector(state => state.users.current_user)
  const posts = useSelector(state => state.posts.items)
  const likes = useSelector(state => state.likes.items)
  const isloading = useSelector(state => state.posts.isLoading)
  const [likeDislikeClicked, seLikeDislikeClickedt] = useState(false)
  const dispatch = useDispatch()
  const csrfToken = document.querySelector('meta[name=csrf-token]').content
  const { id } = useParams()

  useEffect(() => {
    switch (postsType) {
      case 'category':
        dispatch(fetchPosts('new', id))
        break
      case 'new':
        dispatch(fetchPosts('new', null))
        break
      case 'inactive':
        dispatch(fetchPosts('inactive', null))
        break
      case 'my-posts':
        dispatch(fetchPosts('my-posts', null))
        break
      default:
        null
    }

    dispatch(fetchLikes())
  }, [])

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

  if (!user && likeDislikeClicked) return <Redirect to="/login" />

  return (
    <>
      <Alert type="info" />
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

              <LikeDislikeContainer>
                <LikeDislikes
                  name={'Like'}
                  color={'green'}
                  labelPostion={'left'}
                  count={post.likes}
                  active={liked}
                  onClick={() => {
                    dispatch(likePost(post.id, csrfToken))
                    seLikeDislikeClickedt(true)
                    likes = likes++
                  }}
                />
                <LikeDislikes
                  name={'Dislike'}
                  color={'red'}
                  labelPostion={'right'}
                  count={post.dislikes}
                  active={disLiked}
                  onClick={() => {
                    dispatch(dislikePost(post.id, csrfToken))
                    seLikeDislikeClickedt(true)
                  }}
                />
              </LikeDislikeContainer>
            </Post>
          )
        })}
    </>
  )
}

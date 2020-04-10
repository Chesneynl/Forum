import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPostById } from '../../actions/thunks'
import { Container, Button, Link, Heading1 } from '../ui'
import { useParams } from 'react-router-dom'

export function Post() {
  const { id } = useParams()
  const post = useSelector(state => state.posts.singlePost)
  const user = useSelector(state => state.users.current_user)

  useEffect(() => {
    dispatch(fetchPostById(id))
  }, [])

  const dispatch = useDispatch()

  const postDescription = post.description

  return (
    <>
      <Container>
        <Heading1>{post.name}</Heading1>
        <img src={`${post.attachment}`} />
        <div
          dangerouslySetInnerHTML={{
            __html: `${postDescription}`,
          }}
        />
        {user && user.admin && (
          <a href="#" active={true} onClick={() => dispatch(deletePost(post.id))}>
            Delete Post
          </a>
        )}

        <Link name="Back to posts" to="/" />
      </Container>
    </>
  )
}

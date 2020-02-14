import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPostById } from '../../actions/thunks'
import { Container, Button, Link } from '../ui'
import { useParams } from 'react-router-dom'

export function Post(props) {
  const { id } = useParams()
  const post = useSelector(state => state.posts.singlePost)

  console.log(post)

  useEffect(() => {
    dispatch(fetchPostById(id))
  }, [])

  const dispatch = useDispatch()

  const postDescription = post.description

  return (
    <>
      <Container>
        <div>
          <h1>{post.name}</h1>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">{post.description}</ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <img src={`${post.attachment}`} />
            <div
              dangerouslySetInnerHTML={{
                __html: `${postDescription}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <Button active={true} onClick={() => dispatch(deletePost(post.id))}>
              Delete Post
            </Button>
          </div>
        </div>
        <Link name="Back to posts" to="/" />
      </Container>
    </>
  )
}

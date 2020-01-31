import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/thunks'
import { Container, Button } from '../ui'

export function Post() {
  const { post } = props
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
        <a href="/" className="btn btn-link">
          Back to posts
        </a>
      </Container>
    </>
  )
}

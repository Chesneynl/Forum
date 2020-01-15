import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions'
import { Container, Button } from '../ui'

const Post = props => {
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
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {post.description}
            </ul>
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
            <Button onClick={() => dispatch(deletePost(post.id))}>Delete Post</Button>
          </div>
        </div>
        <a href="/" className="btn btn-link">
          Back to posts
        </a>
      </Container>
    </>
  )
}

export default Post

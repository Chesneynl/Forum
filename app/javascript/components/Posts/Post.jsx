import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

function Post(props) {
  const { post } = props
  const dispatch = useDispatch()

  const postDescription = post.description

  return (
    <>
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img src={`${post.attachment}`} />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">{post.name}</h1>
      </div>
      <Container>
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {post.description}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${postDescription}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <Button onClick={() => console.log('deleted')}>Delete Post</Button>
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

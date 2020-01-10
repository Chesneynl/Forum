import React from 'react'
import Button from '../../components/ui/Button'
import SideBar from './Sidebar'
import Container from '../ui/Container'

const CheckPosts = props => {
  const { posts } = props

  const setPostActive = id => {
    event.preventDefault()
    const url = `/admin/posts/${id}`

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

  const allposts = posts.map((post, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img src={`${post.attachment}`} />
        <div className="card-body">
          <h5 className="card-title">{post.name}</h5>
          <a href={`/post/${post.id}`} className="btn custom-button">
            View post
          </a>
          <div onClick={() => setPostActive(post.id)}>Set active post</div>
          <Button onClick={() => setPostActive(post.id)}>Set active post</Button>
          {post.active && 'dit is een active post'}
        </div>
      </div>
    </div>
  ))
  const noEmpty = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>No Posts to approve</h4>
    </div>
  )

  return (
    <>
      <Container>
        <div className="col-sm-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-sm-12 col-lg-9">
          <h5 className="mb-2">Posts</h5>
          {posts.length > 0 ? allposts : noEmpty}
        </div>
      </Container>
    </>
  )
}
export default CheckPosts

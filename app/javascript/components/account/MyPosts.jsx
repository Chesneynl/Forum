import React from 'react'
import Link from '../../components/ui/Link'
import Posts from '../../components/Posts/Posts'

function MyPosts(props) {
  const { posts, path } = props

  return (
    <div className="">
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <Link name="MyPosts" to="/account" currentPath={path} />
              <Link name="Edit profile" to="/account/edit-profile" currentPath={path} />
            </ul>
          </div>
          <div className="col-sm-12 col-lg-9">
            <h5 className="mb-2">Preparation Instructions</h5>
            <Posts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPosts

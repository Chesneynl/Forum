import React, { useEffect } from 'react'

function Profile() {
  useEffect(() => {
    const url = '/profile'
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => console.log(response))
  }, [])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">Dit is je profiel</div>
      </div>
    </div>
  )
}

export default Profile

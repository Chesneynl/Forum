import React, { useEffect } from 'react'

function Logout() {
  useEffect(() => {
    const url = '/logout'
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
        <div className="col-sm-12 col-lg-6 offset-lg-3">Je bent uitgelogd</div>
      </div>
    </div>
  )
}

export default Logout

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../actions/thunks'
import styled from 'styled-components'

const Category = styled.div`
  width: 33.3%;
  height: 175px;
  background-size: cover;
  position: relative;

  a {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`

const CategoryTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`

export function Categories() {
  const categories = useSelector(state => state.posts.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const allcategories = categories.map((category, index) => (
    <Category key={index} style={{ backgroundImage: `url(${category.image})` }}>
      <CategoryTitle>{category.name}</CategoryTitle>
      <a href={`/category/${category.id}`}></a>
    </Category>
  ))

  const noEmpty = (
    <div>
      <h4>No categories yet.</h4>
    </div>
  )

  return (
    <>
      <div className="row">{categories.length > 0 ? allcategories : noEmpty}</div>
    </>
  )
}

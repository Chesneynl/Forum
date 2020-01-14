import React from 'react'
import styled from 'styled-components'
import LoadingSVG from '../../../assets/images/loading.svg'

const LoadingSpinner = () => {
  const Container = styled.div`
    text-align: center;
  `
  return (
    <Container>
      <img src={LoadingSVG} alt="" />
    </Container>
  )
}
export default LoadingSpinner

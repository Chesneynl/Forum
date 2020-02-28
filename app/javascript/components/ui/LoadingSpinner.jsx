import React from 'react'
import styled from 'styled-components'
import LoadingSVG from '../../../assets/images/loading.svg'

export const LoadingSpinner = () => {
  const Container = styled.div`
    text-align: center;
  `
  return (
    <Container>
      <img src={LoadingSVG} alt="loading please wait.." />
    </Container>
  )
}
export default LoadingSpinner

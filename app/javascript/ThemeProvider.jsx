import React from 'react'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, defaultTheme } from './themes'

const Container = styled.div``

const themeLookupTable = {
  defaultTheme: defaultTheme,
  darkTheme: darkTheme,
}

export const ThemeProvider = ({ theme, children, props }) => {
  const namespacedTheme = {
    ...(themeLookupTable[theme] || defaultTheme),
  }
  return (
    <StyledThemeProvider theme={namespacedTheme}>
      <Container>{children}</Container>
    </StyledThemeProvider>
  )
}

export default ThemeProvider

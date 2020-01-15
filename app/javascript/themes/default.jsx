const themeColors = {
  navyDark: 'red',
  navy: '#1D3A8F', // Old 'blue'
  navyLight: '#3250A8',
}

export const defaultTheme = {
  typography: {
    fontFamily: '"Roboto", "Open Sans", Calibri, Helvetica, Tahoma, sans-serif',

    fontSizes: {
      small: '13px',
      medium: '15px',
      large: '17px',
      extraLarge: '24px',
    },

    lineHeights: {
      small: '19px',
      medium: '22px',
      large: '24px',
      extraLarge: '32px',
    },

    fontWeights: {
      normal: 300,
      bold: 600,
    },
  },

  gutters: {
    extraLarge: '50px',
    large: '30px',
    base: '20px',
    medium: '15px',
    small: '10px',
    extraSmall: '5px',
  },

  buttonColors: {
    primaryBackground: themeColors.orange,
    primaryBackgroundHover: '#ffac28',
  },

  colors: {
    primaryDark: themeColors.navyDark,
    primary: themeColors.navy,
    primaryLight: themeColors.navyLight,
  },

  iconSizes: {
    large: '24px',
    base: '16px',
    small: '12px',
  },
}

export default defaultTheme

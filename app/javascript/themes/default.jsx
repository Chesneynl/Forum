const themeColors = {
  primary: '#33a8ff',
  error: '#9f3a38',
  warning: '#c0392b',
  warningDark: '#a53125',
  success: '#2bc066',
  fadedSuccess: '#aeffce33',
  fadedInfo: '#33a8ff12',
}

export const defaultTheme = {
  typography: {
    fontFamily: 'Spartan, Calibri, Helvetica, Tahoma, sans-serif',

    fontSizes: {
      small: '13px',
      medium: '14px',
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

  form: {
    borderColor: '#22242626',
    focusBorderColor: themeColors.primary,
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
    delete: themeColors.warning,
    deleteDark: themeColors.warningDark,
    success: themeColors.success,
    like: '#1eb24c',
    disLike: '#db2828',
  },

  colors: {
    primary: themeColors.primary,
    error: themeColors.error,
    success: themeColors.success,
    fadedSuccess: themeColors.fadedSuccess,
    info: themeColors.fadedInfo,
  },

  iconSizes: {
    large: '24px',
    base: '16px',
    small: '12px',
  },
}

export default defaultTheme

export default {
  grid: {
    container: '112rem',
    gutter: '3rem'
  },
  font: {
    family:
      "'Poppins',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    },
    content: {
      xxsmall: '1rem',
      xsmall: '1.2rem',
      small: '1.4rem',
      regular: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.4rem',
      xxxlarge: '2.8rem'
    },
    heading: {
      xxxsmall: '1.8rem',
      xxsmall: '2rem',
      xsmall: '2.2rem',
      small: '2.0rem',
      regular: '3.6rem',
      large: '4.0rem',
      xlarge: '4.8rem',
      xxlarge: '6rem',
      xxxlarge: '7.2rem',
      xxxxlarge: '9.6rem'
    }
  },
  border: {
    radius: {
      small: '0.2rem',
      regular: '0.4rem',
      medium: '0.6rem',
      large: '0.8rem',
      xlarge: '1.6rem'
    }
  },
  colors: {
    primary: '#2D72FA',
    secondary: '#329DFF',
    blue: '#0070D6',
    black: '#000000',
    blackLight: '#202124',
    white: '#FFFFFF',

    lightgrey: '#ABABAB',
    gray600: 'rgba(13, 13, 13, 0.8)',
    gray700: 'rgba(0, 0, 0, 0.4)',
    gray800: 'rgba(13, 13, 13, 0.8);',
    grayDisable: 'rgba(217, 217, 217, 1)',

    borderGray: 'rgba(255, 255, 255, 0.1)',
    white30: 'rgba(255, 255, 255, 0.3)',

    backgroundTag: '#2C2D2F',
    blueDarker: '#141B25',
    blueDarkerTransparence: '#141b25a9',
    blueDark: '#253245',
    outerSpace: '#2B323B',

    positive: '#329DFF',
    negative: '#FF3E32',
    active2: '#EB891C',
    inactive: '#606060',
    warning: '#FFC632',

    brand: {
      gradientPrimary01:
        'linear-gradient(90deg, #00ADD2 1.91%, #00C5D2 98.76%);',
      primary01: '#00ADD2',
      secondaryPure: '#1A1A1D'
    },

    base: {
      darkPure: 'linear-gradient(180deg, #000000 0%, #253245 100%)',
      dark01: '#000000',
      blueDark: '#253245',
      greyDark: '#2C2D2F',
      lightPure: '#FFFFFF',
      whiteLine: 'rgba(255, 255, 255, 0.1)',
      grayLine: '#555555',
      light03: '#BDBDBD'
    },

    feedback: {
      negativeCompliant: '#FF6191',
      negativePure: '#FF185D',
      positivePure: '#03E0B8',
      informativePure: '#00ADD2',
      mediumPure: '#FF5C00',
      mediumCompliant: '#FE7C33',
      medium: '#FF8E4D',
      highest: '#DE66FF',
      low: '#EEB23A',
      lower: '#68CF54',
      higher: '#FB6A6A',
      high: '#FF9494'
    }
  },
  spacings: {
    xxxsmall: '0.8rem',
    xxsmall: '1.2rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    sm: '4.0rem',
    xlarge: '4.4rem',
    md: '4.8rem',
    xxlarge: '5.6rem',
    xxxlarge: '8.0rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  },
  transition: {
    default: '0.3s ease-in-out',
    fast: '0.1s ease-in-out'
  },
  navbarHegiht: '9.5rem'
} as const

import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      &::before,
      &::after {
        box-sizing: inherit;
      }
    }

    html {
      font-size: 62.5%;
    }

    html,
    body,
    #__next {
      min-height: 100%;
    }

    body {
      background: ${theme.colors.blueDarker};
      font-family: ${theme.font.family};
      color: ${theme.colors.white};
      font-size: ${theme.font.content.regular};
    }

    button {
      cursor: pointer;
      font-family: ${theme.font.family};
    }

    ul {
      list-style: none;
    }

    a {
      text-decoration: none;
    }
  `}
`

export default GlobalStyles

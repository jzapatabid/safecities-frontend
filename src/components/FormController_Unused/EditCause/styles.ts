import styled, { css } from 'styled-components'

export const Main = styled.main``

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  width: 651px;
  margin-bottom: 4rem;
`

export const WrapperTextHero = styled.div`
  margin-bottom: 6.5rem;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-weight: ${theme.font.weights.semiBold};
    font-size: 3.2rem;
    line-height: 4.8rem;
    max-width: 125.8rem;
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacings.xxxsmall};

    strong {
      font-weight: ${theme.font.weights.bold};
    }
  `}
`

export const AssistentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  legend {
    ${({ theme }) => css`
      color: ${theme.colors.negative};
    `}
  }
`

export const Description = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.weights.medium};
    font-size: ${theme.font.content.regular};
    line-height: 2.4rem;
    max-width: 108.9rem;
  `}
`

export const WrapperButton = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    margin-bottom: 6.5rem;
    align-items: center;
    flex-direction: column;

    height: auto;
    flex-wrap: nowrap;
    margin-bottom: 6.5rem;

    a {
      margin-top: 2rem;
      font-weight: 700;
      color: ${theme.colors.brand.primary01};
      cursor: pointer;
    }
  `}
`

export const Hr = styled.hr`
  ${({ theme }) => css`
    margin: 8rem 0 4rem 0;
    width: 100%;
    height: 0.1rem;
    background: ${theme.colors.base.whiteLine};
    border: none;
  `}
`

export const Form = styled.form`
  margin-top: 2rem;
  height: auto;
`

export const Label = styled.label``

export const Input = styled.textarea`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.base.blueDark};
    height: 103px;
    border-radius: 8px;
    border: none;
    color: #fff;
    text-align: start;
    resize: none;
    padding: 2rem;
    margin: 0.8rem 0;
    ::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2rem;
      font-family: ${theme.font.family};
    }

    &:focus {
      outline: none;
      border-bottom: 0.2px solid ${theme.colors.brand.primary01};
      transition: ease-in-out 0.5s;
    }

    ::-webkit-scrollbar {
      width: 0.2rem; /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
      background: #2c2d2f; /* color of the tracking area */
      height: 1px;
    }

    ::-webkit-scrollbar-thumb {
      height: 2px;
      background-color: #555555; /* color of the scroll thumb */
    }
  `}
`

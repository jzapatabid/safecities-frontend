import styled, { css } from 'styled-components'

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    color: #ffffff;
    height: 50px;
    background: ${theme.colors.blueDark};
    border-radius: 5px;
    border: none;
    padding-left: 4rem;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #ffffff;
    }
  `}
`
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  position: relative;
  width: 100%;
`

export const IconWrapper = styled.div`
  position: absolute;
  left: 13px;
  height: 17.5px;
`

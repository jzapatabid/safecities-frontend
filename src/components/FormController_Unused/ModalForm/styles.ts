import styled, { css } from 'styled-components'

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.base.blueDark};
    border-radius: 8px;
    width: 85rem;
    height: auto;
    padding: 4rem;
  `}
`
export const Hr = styled.hr`
  ${({ theme }) => css`
    margin: 8rem 0 2.8rem 0;
    width: 100%;
    height: 0.1rem;
    background: ${theme.colors.base.whiteLine};
    border: none;
  `}
`

type ButtonAreaProps = { doubleButtons: boolean }

export const ButtonArea = styled.div<ButtonAreaProps>`
  ${({ doubleButtons }) => css`
    display: flex;
    justify-content: ${doubleButtons ? 'right' : 'center'};
    align-items: center;
  `}
`
type ButtonProps = { optional?: boolean }

export const Button = styled.button<ButtonProps>`
  ${({ theme, optional }) => css`
    border-radius: 8px;
    background-color: ${optional
      ? 'transparent'
      : theme.colors.brand.primary01};
    color: ${optional
      ? theme.colors.brand.primary01
      : theme.colors.base.blueDark};
    width: 198px;
    height: 50px;
    border: ${optional ? `2px solid ${theme.colors.brand.primary01} ` : 'none'};
    font-weight: 700;
    margin-right: ${optional && `2rem`};
  `}
`

export const Exit = styled.div``

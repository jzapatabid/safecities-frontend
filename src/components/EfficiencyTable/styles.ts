import styled, { css } from 'styled-components'

export const InputColumnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Input = styled.input`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: transparent;
    justify-content: center;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.colors.base.lightPure};
    border-radius: 2px;
    transition: ${theme.transition.fast};
    position: relative;

    &:before {
      content: '';
      width: 7px;
      height: 13px;
      border: 0.25rem solid black;
      border-top: 0;
      border-left: 0;
      position: absolute;
      transform: rotate(41deg);
      top: -0.25px;
      opacity: 0;
      transition: all ${theme.transition.fast};
    }

    &:checked {
      background: ${theme.colors.base.lightPure};
      &:before {
        opacity: 1;
      }
    }
  `}
`

export const HeaderName = styled.p`
  margin-left: 16px;
`

export const HeaderText = styled.p``

export const Name = styled.p`
  margin-left: 16px;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const Desc = styled.p`
  padding: 22px 0px;
  padding-right: 20px;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
`

export const LevelWrapper = styled.div`
  width: 90%;
`

import styled, { css } from 'styled-components'

export const Wrapper = styled.dialog`
  align-items: center;
  display: none;
  justify-content: space-between;
  width: 470px;
  padding: 0px;
  align-items: flex-start;
  background-color: #253245;
  padding: 12px 16px 12px 16px;
  border-radius: 5px;
  border: 1px solid #fff;
  z-index: 10000;
  margin: 20px 20px auto auto;
`

export const Text = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    flex-grow: 1;
    color: ${theme.colors.base.lightPure};
  `}
`

export const VariantWrapper = styled.div`
  height: 20px;
  margin: 2px 20px 0px 0px;
`

export const DismissWrapper = styled.div`
  margin: 2px 0px 0px 0px;
  cursor: pointer;
`

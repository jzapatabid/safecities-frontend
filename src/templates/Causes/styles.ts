import styled, { css } from 'styled-components'

import * as Button from 'components/Button/styles'

export const Wrapper = styled.div`
  display: flex;
  gap: 24px;
`

export const NavBarWrapper = styled.div`
  padding: 0px 20px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 10rem;

  & ${Button.Wrapper} {
    display: block;
    width: 34.9rem;
    margin: 0 auto;

    svg {
      margin-left: 27.5rem;
    }

    &:hover:enabled {
      svg path {
        fill: white;
      }
    }
  }
`

export const Text = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.content.small};
    font-weight: ${theme.font.weights.light};
    font-style: italic;
    margin: 1rem 30px 4rem;
  `}
`

export const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
`

export const BtnWrapper = styled.div`
  align-self: flex-start;
`

export const FiltersWrapper = styled.div`
  min-height: 98px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 20px;
  gap: 24px;
`

export const ClearFiltersBtnWrapper = styled.div`
  flex-shrink: 0;
`

export const ActionsWrapper = styled.div`
  padding: 24px 20px;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  gap: 24px;
`

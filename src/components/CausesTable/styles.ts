import styled, { css } from 'styled-components'

type ProblemNamePropsTypes = {
  selected: boolean
}

export const InputColumnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

export const Input = styled.input`
  ${({ theme }) => css`
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

export const ColumnHeader = styled.span`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.base.lightPure};
  `}
`

export const ColumnName = styled(ColumnHeader)`
  width: 100%;
  margin-left: 16px;
`

export const ColumnTrend = styled(ColumnHeader)`
  width: 100%;
`

export const ColumnCriticality = styled(ColumnHeader)`
  width: 100%;
`

export const CauseName = styled.span<ProblemNamePropsTypes>`
  ${({ selected, theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    margin: 0px 16px;
    cursor: pointer;
    &:first-letter {
      text-transform: capitalize;
    }
    ${selected &&
    css`
      color: ${theme.colors.base.lightPure};
      text-decoration: none;
    `}
  `}
`

export const CountText = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
`

export const ShowCauses = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.feedback.informativePure};
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  `}
`

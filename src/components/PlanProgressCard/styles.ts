import styled, { css } from 'styled-components'

type StatusWrapperProps = {
  index: number
}

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 185px;
    background: ${theme.colors.blueDark};
    display: flex;
    align-items: center;
    padding: 24px;
  `}
`

export const StatusWrapper = styled.div<StatusWrapperProps>`
  ${({ index, theme }) => css`
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    position: relative;
    &:after {
      z-index: 5;
      content: '';
      position: absolute;
      width: 3px;
      height: 135%;
      background: ${theme.colors.blueDarker};
      ${(index === 0 || index === 3) &&
      css`
        height: 70%;
      `}
      ${index === 0 &&
      css`
        top: 50%;
      `}
      ${index === 3 &&
      css`
        bottom: 50%;
      `}
    }
  `}
`

export const IconWrapper = styled.div`
  z-index: 15;
  height: 41px;
  width: 40px;
`

export const DetailsWrapper = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ActionWrapper = styled.div`
  height: 100%;
`

export const StatusBg = styled.div`
  ${({ theme }) => css`
    height: 90px;
    width: 90px;
    border-radius: 50%;
    background: ${theme.colors.blueDarker};
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`

export const BtnWrapper = styled.div``

export const Title = styled.p`
  ${({ theme }) => css`
    font-family: Poppins;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    // cursor: pointer;
  `}
`

export const DateInfo = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: left;
  margin-top: 10px;
`

export const Description = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-top: 18px;
`

export const ProgressWrapper = styled.div`
  margin-top: 10px;
  width: calc(100% - 20px);
`

export const EditWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`

export const EditText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.feedback.informativePure};
    font-family: Poppins;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
  `}
`

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const SectionWrapper = styled.div`
  width: 100%;
  padding: 48px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

export const Title = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.15px;
  text-align: left;
  margin-bottom: 24px;
`

export const RelationshipsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & svg path {
    fill: white;
  }
`

export const Relationships = styled.p<{ disabled?: boolean }>`
  ${({ disabled, theme }) => css`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.25px;
    text-align: left;
    color: ${theme.colors.feedback.informativePure};
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    text-decoration-thickness: 0.5px;

    ${disabled &&
    css`
      cursor: not-allowed;
      color: #555555;
    `}
  `}
`

export const MultilineInputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 48px;
  background: #253245 !important;
  height: 148px;
`

export const DropdownWrapper = styled.div`
  height: 60px;
  width: 382px;
  cursor: pointer;
`

export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  margin-bottom: 24px;
`

export const GeograficDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`

export const SimpleText = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
`

export const DatesWrapper = styled.div`
  width: 100%;
  display: flex;
  height 60px;
  gap: 24px;
  margin-top:24px;
`

export const DateInputWrapper = styled.div`
  height: 100%;
  width: 382px;
  position: relative;
`

export const TitleAndAddNewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TextButtonWrapper = styled.div`
  ${({ theme }) => css`
    height: 48px;
    display: flex;
    justify-content: flex-end;
    & > button {
      text-decoration: underline;
      text-decoration-color: ${theme.colors.feedback.informativePure};
    }
    & svg path {
      stroke: ${theme.colors.feedback.informativePure};
    }
  `}
`

export const DashInputWrapper = styled.div`
  height: 56px;
  width: 100%;
  position: relative;
  width: 382px;
`

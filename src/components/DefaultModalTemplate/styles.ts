import styled from 'styled-components'

export const Wrapper = styled.section`
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const Title = styled.h4`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;

  color: #ffffff;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 75px;
`

export const Description = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;s
  letter-spacing: 0.5px;
  color: #ffffff;
  margin: 24px 0px;
`

export const Footer = styled.footer`
  padding-top: 24px;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  align-self: flex-end;
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DismissWrapper = styled.button`
  height: 16px;
  cursor: pointer;
  border: none;
  background: transparent;
`

export const BtnWrapper = styled.div`
  height: 50px;
  margin-left: 25px;
`

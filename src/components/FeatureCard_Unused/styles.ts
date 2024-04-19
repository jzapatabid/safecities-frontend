import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 40px 20px;
  background: #c4c4c4;
  border-radius: 30px;
`

export const Title = styled.h3`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin: 0px 15px;
`

export const Description = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  margin: 20px 15px;
`

export const InfoWrapper = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  gap: 11px;
  & > div {
    width: 50%;
    min-width: 144px;
  }
`

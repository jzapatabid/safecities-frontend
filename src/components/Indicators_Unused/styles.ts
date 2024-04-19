import styled from 'styled-components'

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 43px;
  justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  padding: 0 3rem;
  & > div {
    min-width: 237px;
  }
`

export const IndicatorWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  background: #d9d9d9;
  border-radius: 30px;
  padding: 60px 35px;
  justify-content: space-evenly;
`

export const IndicatorCount = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  /* identical to box height */

  /* Dark Gradient */

  background: linear-gradient(180deg, #000000 0%, #253245 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

export const IndicatorName = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;

  background: linear-gradient(180deg, #000000 0%, #253245 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

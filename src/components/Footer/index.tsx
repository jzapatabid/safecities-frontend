import { FormattedMessage } from 'react-intl'
import * as S from './styles'

import Container from 'components/Container'

const Footer = () => (
  <S.Wrapper>
    <Container>
      <S.Title>
      <FormattedMessage id='home.footer.text'/>
      </S.Title>
    </Container>
  </S.Wrapper>
)

export default Footer

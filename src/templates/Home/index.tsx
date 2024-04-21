/* eslint-disable prettier/prettier */
import { useAuth } from 'contexts/Auth'

import * as S from './styles'

import Footer from 'components/Footer'
import Header from 'components/Header'
import MainContainer from 'components/MainContainer'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

const Home = () => {
  const {
    user: { fullName }
  } = useAuth()
  return (
    <>
      <LanguageProvider>
        <Header />
        <MainContainer>
        <S.HeroWelcome>
          <S.Paragraph><FormattedMessage id='home.welcome.message'/> {fullName.split(' ')[0]},</S.Paragraph>
          <S.Paragraph>
            <FormattedMessage id='home.welcome.message.complement'/>
          </S.Paragraph>
        </S.HeroWelcome>
        <S.Description>
          <FormattedMessage id='home.description'/>
        </S.Description>
        <S.ReadMoreText target="_blank" href="https://drive.google.com/file/d/1XU-p0aeRNrk3QtBRF5XXCF_--uAjGNiK/view?usp=sharing">
          <FormattedMessage id='home.link.text.one'/>
        </S.ReadMoreText>
        <S.ReadMoreText target="_blank" href="https://drive.google.com/file/d/1-647R57Oe5PvDbNkWqWlq8RII-SBgP_K/view?usp=sharing">
          <FormattedMessage id='home.link.text.two'/>
        </S.ReadMoreText>
        <Footer />
      </MainContainer>
</LanguageProvider>
    </>
  )
}

export default Home

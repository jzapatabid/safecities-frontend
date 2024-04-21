import { useAuth } from 'contexts/Auth'

import * as S from './styles'

// import FeatureCard from 'components/FeatureCard'
import Footer from 'components/Footer'
import Header from 'components/Header'
// import Indicators from 'components/Indicators'
import MainContainer from 'components/MainContainer'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from 'contexts/LanguageSelector'

// const indicators = [
//   { name: 'Roubo', count: 200 },
//   { name: 'Assassinato', count: 10 },
//   { name: 'Tráfico', count: 30 },
//   { name: 'Assédio moral', count: 500 }
// ]

// const features = [
//   {
//     title: 'Priorize problemas para o seu plano',
//     desc: 'Navegue por diversos problemas, entenda os níveis de criticidade. Na sequência, associe as principais causas a um problema específico para aumentar a sua compreensão, gerando o melhor diagnóstico possível.',
//     details: [
//       { content: '5 problemas relacionados' },
//       { content: '2 problemas críticos' }
//     ]
//   },
//   {
//     title: 'Associe causas a problemas priorizados',
//     desc: 'Para cada problema priorizado, opte por adentrar no detalhamento de suas causas mais relevantes. Uma vez que todos os problemas priorizados tenham causas estabelecidas, dê continuidade ao programa no final da página. Compreenda melhor a associação de causas por meio do material disponibilizado',
//     details: [
//       { content: '8 problemas priorizados' },
//       { content: '0 problemas críticos' }
//     ]
//   },
//   {
//     title: 'Analise e selecione programas para compor o seu plano municipal',
//     desc: 'Navegue pelos diversos problemas e causas que você priorizou até agora e analise programas relevantes à mitigação das causas e à superação dos problemas prioritários. Na sequência, selecione aqueles programas baseados em evidências que você considerar mais pertinentes, ou adicione programas municipais que gostaria de considerar para a composição do seu plano municipal.',
//     details: [
//       { content: '5 programas novos' },
//       { content: '3 programas recomendados' }
//     ]
//   }
// ]

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

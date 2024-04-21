import { useRouter } from 'next/router'

import * as S from './styles'

import LeftArrow from 'components/icons/LeftArrow'
import { FormattedMessage } from 'react-intl'
import {useIntl} from 'react-intl'

type NavigateBackProps = {
  url: string
  linkText: string
  normalText: string
}

  
const NavigateBack = ({ normalText, linkText, url }: NavigateBackProps) => {
  const router = useRouter()
  let intl = useIntl()
  
  let goBackText = intl.formatMessage({id: normalText})
  let linkFormmatedText = intl.formatMessage({id: linkText})

  return (
    <S.GobackWrapper>
      <S.NavWrapper>
        <LeftArrow height={24} width={24} onClick={() => router.push(url)}/>
      </S.NavWrapper>
      <S.GoBackText>
        {goBackText + " "}
        <S.LinkText onClick={() => router.push(url)}>{linkFormmatedText}</S.LinkText>
      </S.GoBackText>
    </S.GobackWrapper>
  )
}

export default NavigateBack

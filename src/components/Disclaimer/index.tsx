import { FormattedMessage } from 'react-intl'
import * as S from './styles'

import { DisclaimerProps } from './types'

import ToastWarningIcon from 'components/icons/ToastWarningIcon'

const Disclaimer: React.FC<DisclaimerProps> = ({
  data: { line1, line2 },
  withTitle,
  mtOnly
}) => {
  return (
    <S.Wrapper withTitle={withTitle} mtOnly={mtOnly}>
      {!withTitle && (
        <S.VariantWrapper>
          <ToastWarningIcon fill="#fff"/>
        </S.VariantWrapper>
      )}
      <S.TextWrapper>
        <S.Text><FormattedMessage id={line1}/></S.Text>
        {line2 ? (
          <S.TextWrapper>
            <S.InlineText>{<FormattedMessage id={line2}/>}</S.InlineText>
            <S.ReadMoreText
              target="_blank"
              href="https://drive.google.com/file/d/1-647R57Oe5PvDbNkWqWlq8RII-SBgP_K/view?usp=sharing"
            >
              <FormattedMessage id='diagnosis.disclaimer.link'/>
            </S.ReadMoreText>
          </S.TextWrapper>
        ) : null}
      </S.TextWrapper>
    </S.Wrapper>
  )
}

export default Disclaimer

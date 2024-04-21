import Link from 'next/link'

import * as S from './styles'

import ToastSuccessIcon from 'components/icons/ToastSuccessIcon'
import { FormattedMessage } from 'react-intl'

import { useIntl } from 'react-intl'


type StatCardProps = {
  count: number
  label: string
  type?: string
  count2?: number
  label2?: string
  link?: string
  iniciativasCard?: boolean
}

const StatCard: React.FC<StatCardProps> = ({
  count = 0,
  count2 = 0,
  label = '',
  label2 = '',
  type,
  link = '',
  iniciativasCard = false
}) => {

  let intl = useIntl()

  let innerLabel = intl.formatMessage({ id: 'diagnosis.associated.card'})
  


 

  return (
    <S.Wrapper type={type} withLabel2={Boolean(innerLabel)}>
      <S.Section1Wrapper>
        <S.Count>{count}</S.Count>
        <S.Label>{<FormattedMessage id={label}/>}</S.Label>
      </S.Section1Wrapper>
      {innerLabel && (
        <S.IndicatorInfoWrapper>
          {(!innerLabel.toLowerCase().startsWith("ver") && !innerLabel.toLowerCase().startsWith("see")) && (
            <S.IconWrapper>
              <ToastSuccessIcon />
            </S.IconWrapper>
          )}
          {link ? (
            <Link href={link} passHref>
              <S.IndicatorText link>{`${
                (!innerLabel.toLowerCase().startsWith("ver") && !innerLabel.toLowerCase().startsWith("see")) ? count2 : ''
              } ${innerLabel}`}</S.IndicatorText>
            </Link>
          ) : (
            // (!label2.toLowerCase().startsWith("ver") && !label2.toLowerCase().startsWith("see")) ? count2 : ''
            <S.IndicatorText>{`${
              (!label2.toLowerCase().startsWith("ver") && !label2.toLowerCase().startsWith("see")) && iniciativasCard
                ? label2.replace('XX', count2.toString())
                : ''
            } ${iniciativasCard ? '' : label2}`}</S.IndicatorText>
          )}
        </S.IndicatorInfoWrapper>
      )}
    </S.Wrapper>
  )
}

export default StatCard

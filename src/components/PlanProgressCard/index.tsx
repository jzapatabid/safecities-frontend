// import Link from 'next/link'

import { PORTUGESE_MONTH_MAPPING } from 'constants/Global'

import Link from 'next/link'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import CheckCircleGreenIcon from 'components/icons/CheckCircleGreenIcon'
import EditIcon from 'components/icons/EditIcon'
import FilledWraningIconBig from 'components/icons/FilledWarningIconBig'
import TubelightIndicator from 'components/TubelightIndicator'
import { FormattedMessage }  from 'react-intl'
import {useIntl} from 'react-intl'

const PlanProgressCard = ({ detail, data }: { detail: any; data: any }) => {

  let intl = useIntl()
  let progress = intl.formatMessage({id: 'step.by.step.progress'})
  let lastUpdateF = intl.formatMessage({id: 'last.update.footer.text'})


  const [year = '', month = '', date = ''] = data.lastUpdate
    ? data.lastUpdate.split('T')[0].split('-')
    : ''

  return (
    <S.Wrapper>
      <S.StatusWrapper index={detail.idx}>
        <S.StatusBg>
          <S.IconWrapper>
            {data.progressPercentage === 100 ? (
              <CheckCircleGreenIcon />
            ) : (
              <FilledWraningIconBig />
            )}
          </S.IconWrapper>
        </S.StatusBg>
      </S.StatusWrapper>
      <S.DetailsWrapper>
        <S.Title>{<FormattedMessage id = {detail.title} />}</S.Title>
        <S.DateInfo>{`${lastUpdateF} ${date} de ${
          PORTUGESE_MONTH_MAPPING[month] as string
        } de ${year}`}</S.DateInfo>
        <S.Description>{<FormattedMessage id = {detail.description} />}</S.Description>
        <S.ProgressWrapper>
          <TubelightIndicator
            score={data.progressPercentage}
            label={`${progress} ${
              data.progressPercentage
                ? `${data.progressPercentage}%`
                : 'indisponível'
            }`}
            type="planStatus"
          />
        </S.ProgressWrapper>
      </S.DetailsWrapper>
      <S.ActionWrapper>
        {data.progressPercentage === 100 ? (
          <Link href={detail.href} passHref>
            <S.EditWrapper>
              <EditIcon />
              <S.EditText>{<FormattedMessage id= "planning.stats.card.button.edit" />}</S.EditText>
            </S.EditWrapper>
          </Link>
        ) : (
          <S.BtnWrapper>
            <ButtonV2
              loading={false}
              text= {<FormattedMessage id= "button.step.by.step.continue" />}
              disabled={!detail.href}
              href={detail.href}
            />
          </S.BtnWrapper>
        )}
      </S.ActionWrapper>
    </S.Wrapper>
  )
}

export default PlanProgressCard

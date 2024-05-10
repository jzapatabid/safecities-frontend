import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'
import { FormattedMessage } from 'react-intl'

type AccordionFooterProps = {
  onSave: () => void
  toggleAccordion: () => void
  disableSave?: boolean
}

const AccordionFooter = ({
  onSave,
  toggleAccordion,
  disableSave
}: AccordionFooterProps) => {
  return (
    <S.Footer>
      <S.ButtonWrapper>
        <ButtonV2
          loading={false}
          variant="outline"
          onClick={toggleAccordion}
          text={<FormattedMessage id = "button.cancel" />}
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <ButtonV2
          disabled={disableSave}
          loading={false}
          onClick={onSave}
          text={<FormattedMessage id = "button.save" />}
          LeadingIcon={FlagFilledIcon}
        />
      </S.ButtonWrapper>
    </S.Footer>
  )
}

export default AccordionFooter

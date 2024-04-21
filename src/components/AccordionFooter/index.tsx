import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import FlagFilledIcon from 'components/icons/FlagFilledIcon'

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
          text="Cancelar"
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <ButtonV2
          disabled={disableSave}
          loading={false}
          onClick={onSave}
          text="Salvar"
          LeadingIcon={FlagFilledIcon}
        />
      </S.ButtonWrapper>
    </S.Footer>
  )
}

export default AccordionFooter

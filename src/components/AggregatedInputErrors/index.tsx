import { SetNewPwDetailedErrorTypes } from 'types/Auth'

import { BACKEND_ERROR } from 'enums/Global'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import WarningIcon from 'components/icons/WarningIcon'

export enum AGGREGATED_INPUT_ERRORS_VARIANTS {
  INLINE = 'inline',
  DETAILED = 'detailed'
}

type AggregatedInputErrorsProps = {
  detailedError: SetNewPwDetailedErrorTypes
  getErrorMessage: (errorObject: any) => string
  inlineError: any
  handleClick: () => void
  variant:
    | AGGREGATED_INPUT_ERRORS_VARIANTS.INLINE
    | AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED
}

const AggregatedInputErrors = ({
  detailedError,
  inlineError,
  getErrorMessage,
  variant,
  handleClick
}: AggregatedInputErrorsProps) => {
  return (
    <S.ErrorMessageWrapper variant={variant} errorLevel={detailedError?.level}>
      <S.IconWrapper>
        <WarningIcon/>
      </S.IconWrapper>
      <>
        {variant === AGGREGATED_INPUT_ERRORS_VARIANTS.DETAILED ? (
          <S.ErrorMessage variant={variant}>
            <S.Title>{detailedError.title}</S.Title>
            <S.Description>{detailedError.desc}</S.Description>
            {detailedError?.level === BACKEND_ERROR.UNCATEGORISED && (
              <ButtonV2
                loading={false}
                variant="outline"
                text="Recarregar página"
                onClick={handleClick}
             />
            )}
          </S.ErrorMessage>
        ) : (
          <S.ErrorMessage variant={variant}>
            {getErrorMessage(inlineError)}
          </S.ErrorMessage>
        )}
      </>
    </S.ErrorMessageWrapper>
  )
}

export default AggregatedInputErrors

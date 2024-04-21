import {
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
  useState,
  useEffect
} from 'react'

import * as S from './styles'

import ButtonV2 from 'components/ButtonV2'
import IconButton from 'components/IconButton'
import AddCircleOutlineIcon from 'components/icons/AddCircleOutlineIcon'
import EyeIcon from 'components/icons/EyeIcon'
import EyeOpenIcon from 'components/icons/EyeOpenIcon'

export type InputProps = {
  error?: string | boolean
  trailingAction?: any
  placeholder?: any
  placeholderFixed?: boolean
  secondaryPlaceholder?: string
  endIconAction?: any
  numericOnly?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    type,
    error = null,
    trailingAction,
    endIconAction,
    numericOnly = false,
    ...rest
  },
  ref
) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (numericOnly) {
      // Allow numeric values, space, and some special keys like backspace, delete, arrow keys
      if (
        !/^[\d\s]$/.test(event.key) &&
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        event.preventDefault()
      }
    }
  }

  const [isFirefox, setIsFirefox] = useState(false)
  const [showText, setShowText] = useState(type === 'text' ? true : false)

  useEffect(() => {
    setIsFirefox(navigator.userAgent.includes('Firefox'))
  }, [])
  
  return (
    <>
      <S.InputField
        name={name}
        error={!!error}
        ref={ref}
        id={rest.placeholder!.props.id}
        placeholderFixed
        type={showText ? 'text' : 'password'}
        trailingAction={trailingAction}
        isFirefox={isFirefox}
        {...rest}
        placeholder={rest.secondaryPlaceholder}
        onKeyDown={handleKeyDown}
     />
      <S.Placeholder htmlFor={rest.placeholder} placeholderFixed>
        {rest.placeholder}
      </S.Placeholder>
      {type === 'password' && (
        <S.IconWrapper onClick={() => setShowText((value) => !value)}>
          {showText === false ? <EyeIcon/> : <EyeOpenIcon/>}
        </S.IconWrapper>
      )}
      {trailingAction && (
        <S.ButtonWrapper onClick={trailingAction}>
          <ButtonV2 loading={false} variant="outline" text="Carregar"/>
        </S.ButtonWrapper>
      )}
      {endIconAction && (
        <S.TrainingIconActionWrapper>
          <IconButton icon={<AddCircleOutlineIcon/>} onClick={endIconAction}/>
        </S.TrainingIconActionWrapper>
      )}
    </>
  )
}

export default forwardRef(Input)

import {
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useRef
} from 'react'

import * as S from './styles'

export type MultilineInputProps = {
  error?: string | boolean
  restrictionLabel?: any
  placeholderFixed?: boolean
  secondaryPlaceholder?: string
} & InputHTMLAttributes<HTMLTextAreaElement>

const MutlilineInput: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  MultilineInputProps
> = ({ name, error = null, ...rest }, ref) => {
  const placeHolderRef = useRef<HTMLLabelElement>(null)

  const handler = (element: any) => {
    if (element.srcElement && placeHolderRef.current) {
      const isScrolling = element.srcElement.scrollTop > 5
      placeHolderRef.current.style.display = isScrolling ? 'none' : 'block'
    }
  }

  useEffect(() => {
    const textAreaElement = document.getElementById(rest.placeholder || '')
    if (textAreaElement) {
      textAreaElement.addEventListener('scroll', handler)
    }
    return () => {
      if (textAreaElement) {
        textAreaElement.removeEventListener('scroll', handler)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <S.InputField
        name={name}
        error={!!error}
        ref={ref}
        placeholderFixed
        id={rest.placeholder}
        {...rest}
        placeholder={rest.secondaryPlaceholder}
      />
      <S.Placeholder
        ref={placeHolderRef}
        htmlFor={rest.placeholder}
        placeholderFixed
      >
        {rest.placeholder}
      </S.Placeholder>
      {rest.restrictionLabel && (
        <S.RestrictionLabel>{rest.restrictionLabel}</S.RestrictionLabel>
      )}
    </>
  )
}

export default forwardRef(MutlilineInput)

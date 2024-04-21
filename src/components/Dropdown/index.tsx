import { useEffect, useRef } from 'react'

import * as S from './styles'

import { DropdownTypes } from './types'

import CheckboxV2 from 'components/CheckboxV2'
import PlusSignIcon from 'components/icons/PlusSignIcon'

const Dropdown: React.FC<DropdownTypes> = ({
  singleSelect,
  options,
  open,
  setOpen,
  onOptionClick,
  selectedText,
  placeholder,
  addNewLabel,
  onAdd
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <S.Wrapper
      ref={dropdownRef}
      onClick={() => {
        setOpen((state) => !state)
      }}
      open={open}
      disabled={!options?.length && !addNewLabel}
    >
      {placeholder && (
        <S.Placeholder
          htmlFor={placeholder}
          hasSelection={Boolean(selectedText)}
        >
          {placeholder}
        </S.Placeholder>
      )}
      <S.SelectedText singleSelect={singleSelect} placeholder={placeholder}>
        {selectedText}
      </S.SelectedText>
      <S.IconWrapper>
        <S.DownArrow state={open}/>
      </S.IconWrapper>
      <S.OptionsWrapper onClick={(e) => e.stopPropagation()} open={open}>
        {options?.map((option, idx) => (
          <S.Option
            key={idx}
            onClick={() => onOptionClick(option)}
            selected={
              option?.selected ||
              option?.checked ||
              selectedText === option?.text
            }
          >
            {!singleSelect && (
              <CheckboxV2 checked={option.checked || false} readOnly/>
            )}
            <S.OptionText>{option?.text}</S.OptionText>
          </S.Option>
        ))}
        {addNewLabel && (
          <S.Option link>
            <PlusSignIcon/>
            <S.OptionText onClick={onAdd}>{addNewLabel}</S.OptionText>
          </S.Option>
        )}
      </S.OptionsWrapper>
    </S.Wrapper>
  )
}

export default Dropdown

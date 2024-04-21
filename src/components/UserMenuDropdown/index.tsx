import { useRouter } from 'next/router'

import * as S from './styles'

import { DropdownTypes } from './types'

const UserMenuDropdown: React.FC<DropdownTypes> = ({
  options,
  fixedSelection,
  children,
  open,
  onClick
}) => {
  const router = useRouter()

  const handleOptionClick = (option: any) => {
    option.href ? router.push(option.href) : option.onClick()
    onClick()
  }
  return (
    <S.Wrapper onClick={onClick}>
      {fixedSelection && (
        <S.FirstSelectionWrapper open={open}>
          {children}
          <S.DownArrow state={open}/>
        </S.FirstSelectionWrapper>
      )}
      <S.OptionsWrapper onClick={(e) => e.stopPropagation()} open={open}>
        {options.map((option, idx) => (
          <S.Option key={idx} onClick={(e) => e.stopPropagation()}>
            <S.OptionText onClick={() => handleOptionClick(option)}>
              {option.text}
            </S.OptionText>
            {option.TrailingIcon && (
              <option.TrailingIcon height="18" width="18"/>
            )}
          </S.Option>
        ))}
      </S.OptionsWrapper>
    </S.Wrapper>
  )
}

export default UserMenuDropdown

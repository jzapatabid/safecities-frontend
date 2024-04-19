import * as S from './styles'

type ControlledTabsProps = {
  tabs: { name: string | any }[]
  selected?: number
  // onTabClick: Dispatch<SetStateAction<number>>
  onTabClick: (index: number, item?: any) => void
  linkText?: boolean
  noBottomBorder?: boolean
  selectId?: any
}
const ControlledTabs = ({
  tabs,
  selected,
  selectId,
  onTabClick,
  linkText,
  noBottomBorder
}: ControlledTabsProps) => {
  return (
    <S.Wrapper linkText={linkText} noBottomBorder={noBottomBorder}>
      {tabs.map((tab: any, idx) => (
        <S.Tab
          key={idx}
          selected={
            tab.initiativeId ? selectId === tab.initiativeId : idx === selected
          }
          onClick={() => onTabClick(idx, tab)}
          linkText={linkText}
        >
          <S.Name>{tab.name}</S.Name>
        </S.Tab>
      ))}
    </S.Wrapper>
  )
}
export default ControlledTabs

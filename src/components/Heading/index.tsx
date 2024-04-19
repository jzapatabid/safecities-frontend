import * as S from './styles'
import theme from 'styles/theme'

export type HeadingProps = {
  color?: string
  size?: keyof typeof theme.font.heading
  fontWeight?: 400 | 500 | 600 | 700
  lineHeight?: number | string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

const Heading = ({
  color = '#fff',
  size = 'regular',
  fontWeight = 600,
  level = 1,
  lineHeight,
  children
}: HeadingProps) => (
  <S.Wrapper
    level={level}
    color={color}
    size={size}
    fontWeight={fontWeight}
    lineHeight={lineHeight}
  >
    {children}
  </S.Wrapper>
)

export default Heading

import { SVGProps } from 'react'

import theme from 'styles/theme'

interface SVGRProps {
  title?: string
  titleId?: string
}

const PlusSignIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M12.5 5v14M5.5 12h14"
      stroke={theme.colors.blueDark}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default PlusSignIcon

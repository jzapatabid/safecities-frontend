import { SVGProps } from 'react'

const FlagFilledIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.4 2.50003L9 0.500031H0V17.5H2V10.5H7.6L8 12.5H15V2.50003H9.4Z"
      fill={props.fill || '#141B25'}
    />
  </svg>
)

export default FlagFilledIcon

import { SVGProps } from 'react'

const FlagIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 0.500031L9.5 2.50003H15.5V12.5H8.5L7.5 10.5H2.5V17.5H0.5V0.500031H8.5ZM9.5 10.5H13.5V4.50003H8.5L7.5 2.50003H2.5V8.50003H8.5L9.5 10.5Z"
      fill={props.fill || '#141B25'}
   />
  </svg>
)

export default FlagIcon

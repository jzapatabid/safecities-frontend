import { SVGProps } from 'react'

const SkipNextIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5 12L6 18V6L14.5 12ZM18 18H16V6H18V18Z"
      fill="#141B25"
    />
  </svg>
)

export default SkipNextIcon

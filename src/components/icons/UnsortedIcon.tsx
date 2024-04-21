import { SVGProps } from 'react'

const UnsortedIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="10"
    height="18"
    viewBox="0 0 10 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.17 6L5 2.83L1.83 6L0.410004 4.59L5 0L9.58 4.59L8.17 6ZM1.83 12L5 15.17L8.17 12L9.59 13.41L5 18L0.420004 13.41L1.83 12Z"
      fill="white"
      fillOpacity="0.3"
   />
  </svg>
)

export default UnsortedIcon

import { SVGProps } from 'react'

const DownloadIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 6.5H14L7 13.5L0 6.5H4V0.5H10V6.5ZM0 17.5V15.5H14V17.5H0Z"
      fill="white"
   />
  </svg>
)

export default DownloadIcon

import { SVGProps } from 'react'

const BarChartIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
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
      d="M10.6 5H13.4V19H10.6V5ZM5 9.2H8V19H5V9.2ZM19 13H16.2V19H19V13Z"
      fill="white"
      fillOpacity="0.3"
   />
  </svg>
)

export default BarChartIcon

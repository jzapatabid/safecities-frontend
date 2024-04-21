import { SVGProps } from 'react'

const PlansIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1.00686L16 3.80686L24 0.700195V22.3002L16 24.9935L8 22.1935L0 25.3002V3.7002L8 1.00686ZM8 19.3802L16 22.1935V6.63353L8 3.8202V19.3802Z"
      fill="white"
    />
  </svg>
)

export default PlansIcon

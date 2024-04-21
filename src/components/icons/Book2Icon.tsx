import { SVGProps } from 'react'

const Book2Icon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H16V20H0V0ZM7 2H2V10L4.5 8.5L7 10V2Z"
      fill="white"
   />
  </svg>
)

export default Book2Icon

import { SVGProps } from 'react'

const ProgramsIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 3.33317H15.76C15.2 1.7865 13.7333 0.666504 12 0.666504C10.2667 0.666504 8.8 1.7865 8.24 3.33317H0V27.3332H24V3.33317ZM12 3.33317C12.7333 3.33317 13.3333 3.93317 13.3333 4.6665C13.3333 5.39984 12.7333 5.99984 12 5.99984C11.2667 5.99984 10.6667 5.39984 10.6667 4.6665C10.6667 3.93317 11.2667 3.33317 12 3.33317ZM5.33333 21.9998H14.6667V19.3332H5.33333V21.9998ZM18.6667 16.6665H5.33333V13.9998H18.6667V16.6665ZM5.33333 11.3332H18.6667V8.6665H5.33333V11.3332Z"
      fill="white"
    />
  </svg>
)

export default ProgramsIcon

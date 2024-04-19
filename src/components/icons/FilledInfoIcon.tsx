import { SVGProps } from 'react'

const FilledInfoIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0.5C4.48 0.5 0 4.98 0 10.5C0 16.02 4.48 20.5 10 20.5C15.52 20.5 20 16.02 20 10.5C20 4.98 15.52 0.5 10 0.5ZM9 15.5L9 9.5L11 9.5L11 15.5L9 15.5ZM9 5.5V7.5L11 7.5V5.5L9 5.5Z"
      fill="white"
    />
  </svg>
)

export default FilledInfoIcon

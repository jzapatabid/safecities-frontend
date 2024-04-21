import { SVGProps } from 'react'

const DeleteIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 1H14V3H0V1H3.5L4.5 0H9.5L10.5 1ZM13 18H1V4H13V18Z"
      fill="#FF9494"
   />
  </svg>
)

export default DeleteIcon

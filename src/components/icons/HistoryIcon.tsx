import { SVGProps } from 'react'

const HistoryIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 9C3.5 4.03 7.53 0 12.5 0C17.47 0 21.5 4.03 21.5 9C21.5 13.97 17.47 18 12.5 18C10.01 18 7.77 16.99 6.14 15.36L7.56 13.94C8.82 15.21 10.57 16 12.5 16C16.37 16 19.5 12.87 19.5 9C19.5 5.13 16.37 2 12.5 2C8.63 2 5.5 5.13 5.5 9H8.5L4.46 13.03L4.39 12.89L0.5 9H3.5ZM11.5 10V5H13V9.14L16.52 11.23L15.75 12.52L11.5 10Z"
    />
  </svg>
)

export default HistoryIcon

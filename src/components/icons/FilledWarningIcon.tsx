import { SVGProps } from 'react'

const FilledWarningIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
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
      d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM13 7V13H11V7H13ZM13 17V15L11 15V17H13Z"
      fill="#EEB23A"
    />
  </svg>
)

export default FilledWarningIcon

import { SVGProps } from 'react'

const AddCircleOutlineIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM11.5 7V11H7.5V13H11.5V17H13.5V13H17.5V11H13.5V7H11.5ZM4.5 12C4.5 16.41 8.09 20 12.5 20C16.91 20 20.5 16.41 20.5 12C20.5 7.59 16.91 4 12.5 4C8.09 4 4.5 7.59 4.5 12Z"
      fill="white"
    />
  </svg>
)

export default AddCircleOutlineIcon

import { SVGProps } from 'react'

const DeptHospitalIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.01333 4H28V28H4L4.01333 4ZM18.6667 18.6667H24V13.3333H18.6667V8H13.3333V13.3333H8V18.6667H13.3333V24H18.6667V18.6667Z"
      fill="white"
   />
  </svg>
)

export default DeptHospitalIcon

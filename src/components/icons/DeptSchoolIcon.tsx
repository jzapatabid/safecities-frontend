import { SVGProps } from 'react'

const DeptSchoolIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
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
      d="M1.33398 12L16.0007 4L30.6673 12V22.6667H28.0006V13.4533L16.0007 20L1.33398 12ZM6.66732 22.9067V17.5733L16.0007 22.6667L25.334 17.5733V22.9067L16.0007 28L6.66732 22.9067Z"
      fill="white"
   />
  </svg>
)

export default DeptSchoolIcon

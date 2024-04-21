import { SVGProps } from 'react'

const DeptSecurityIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
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
      d="M4 6.66634L16 1.33301L28 6.66634V14.6663C28 22.0663 22.88 28.9863 16 30.6663C9.12 28.9863 4 22.0663 4 14.6663V6.66634ZM25.3333 15.9863H16V4.25301L6.66667 8.39967V15.9997H16V27.9063C20.96 26.373 24.6267 21.4797 25.3333 15.9863Z"
      fill="white"
   />
  </svg>
)

export default DeptSecurityIcon

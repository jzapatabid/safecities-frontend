import { SVGProps } from 'react'

const FileAttachmentIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 6V17.5C16 19.71 14.21 21.5 12 21.5C9.79 21.5 8 19.71 8 17.5V5C8 3.62 9.12 2.5 10.5 2.5C11.88 2.5 13 3.62 13 5V15.5C13 16.05 12.55 16.5 12 16.5C11.45 16.5 11 16.05 11 15.5V6H9.5V15.5C9.5 16.88 10.62 18 12 18C13.38 18 14.5 16.88 14.5 15.5V5C14.5 2.79 12.71 1 10.5 1C8.29 1 6.5 2.79 6.5 5V17.5C6.5 20.54 8.96 23 12 23C15.04 23 17.5 20.54 17.5 17.5V6H16Z"
      fill="white"
   />
  </svg>
)

export default FileAttachmentIcon

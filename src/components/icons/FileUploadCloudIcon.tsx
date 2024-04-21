import { SVGProps } from 'react'

const FileUploadCloudIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 8C31.28 8 37.34 13.18 38.7 20.08C43.9 20.44 48 24.72 48 30C48 35.52 43.52 40 38 40H12C5.38 40 0 34.62 0 28C0 21.82 4.68 16.72 10.7 16.08C13.2 11.28 18.22 8 24 8ZM28 34V26H34L24 16L14 26H20V34H28Z"
      fill="white"
   />
  </svg>
)

export default FileUploadCloudIcon

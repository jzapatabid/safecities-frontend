import { SVGProps } from 'react'

const NotificationsBell = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 22 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 27C12.5125 27 13.75 25.7538 13.75 24.2308H8.25C8.25 25.7538 9.47375 27 11 27ZM19.25 18.6923V11.7692C19.25 7.51846 16.995 3.96 13.0625 3.01846V2.07692C13.0625 0.927692 12.1412 0 11 0C9.85875 0 8.9375 0.927692 8.9375 2.07692V3.01846C4.99125 3.96 2.75 7.50462 2.75 11.7692V18.6923L0 21.4615V22.8462H22V21.4615L19.25 18.6923Z"
      fill="white"
   />
  </svg>
)

export default NotificationsBell

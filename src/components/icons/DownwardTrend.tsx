import { SVGProps } from 'react'

const DownwardTrendIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="12"
    viewBox="0 0 20 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 12L16.29 9.71L11.41 4.83L7.41 8.83L0 1.41L1.41 0L7.41 6L11.41 2L17.71 8.29L20 6V12H14Z"
      fill={props.fill || '#68CF54'}
   />
  </svg>
)

export default DownwardTrendIcon

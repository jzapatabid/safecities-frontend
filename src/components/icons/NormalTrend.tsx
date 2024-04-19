import { SVGProps } from 'react'

const NormalTrendIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="8"
    viewBox="0 0 20 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 4L15.5 0V3H0.5V5H15.5V8L19.5 4Z"
      fill={props.fill || 'white'}
    />
  </svg>
)

export default NormalTrendIcon

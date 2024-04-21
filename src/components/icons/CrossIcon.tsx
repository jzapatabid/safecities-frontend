import { SVGProps } from 'react'

const CrossIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="19"
    height="22"
    viewBox="0 0 19 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.4814 11.1005L19 19.187V21.3181H17.0186L9.5 13.2316L1.98143 21.3181H0V19.187L7.51857 11.1005L0 3.01392V0.882812H1.98143L9.5 8.96935L17.0186 0.882812H19V3.01392L11.4814 11.1005Z"
      fill={props.fill || 'black'}
    />
  </svg>
)

export default CrossIcon

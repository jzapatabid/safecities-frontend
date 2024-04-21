import { SVGProps } from 'react'

const InfoIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 7H13V9H11V7Z" fill={props.color || 'white'}/>
    <path d="M11 11H13V17H11V11Z" fill={props.color || 'white'}/>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z"
      fill={props.color || 'white'}
   />
  </svg>
)

export default InfoIcon

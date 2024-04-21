import { SVGProps } from 'react'

const PaginationLeft = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="9"
    height="13"
    viewBox="0 0 9 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.25473 11.115L3.67473 6.52502L8.25473 1.93502L6.84473 0.525024L0.844727 6.52502L6.84473 12.525L8.25473 11.115Z"
      fill={props.fill || 'white'}
   />
  </svg>
)

export default PaginationLeft

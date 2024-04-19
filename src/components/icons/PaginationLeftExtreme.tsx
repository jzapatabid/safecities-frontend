import { SVGProps } from 'react'

const PaginationExtremeLeft = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.34473 0.525024H0.344727V12.525H2.34473V0.525024ZM8.16473 6.52502L12.7547 11.115L11.3447 12.525L5.34473 6.52502L11.3447 0.525024L12.7547 1.93502L8.16473 6.52502Z"
      fill={props.fill || 'white'}
    />
  </svg>
)

export default PaginationExtremeLeft

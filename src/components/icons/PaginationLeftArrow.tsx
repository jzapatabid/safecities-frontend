import { SVGProps } from 'react'

const PaginationLeftArrow = ({
  transform,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width="10"
    height="17"
    viewBox="0 0 10 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 15.4803L8.48329 17L0 8.5L8.48329 0L10 1.5197L3.03342 8.5L10 15.4803Z"
      fill="white"
      transform={transform || ''}
   />
  </svg>
)

export default PaginationLeftArrow

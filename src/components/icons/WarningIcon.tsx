import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
}

const WarningIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={props.width || 80}
    height={props.height || 70}
    viewBox="0 0 80 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M79.107 60.156 45.777 3.281c-2.551-4.375-8.99-4.375-11.56 0L.905 60.156C-1.66 64.516 1.534 70 6.673 70h66.659c5.119 0 8.322-5.469 5.775-9.844ZM36.246 21.25c0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.688 3.75 3.75v20c0 2.07-1.68 3.75-3.61 3.75s-3.89-1.672-3.89-3.75v-20ZM39.996 60a4.913 4.913 0 1 1 .001-9.827A4.913 4.913 0 0 1 39.996 60Z"
      fill={props.fill || '#253245'}
   />
  </svg>
)

export default WarningIcon

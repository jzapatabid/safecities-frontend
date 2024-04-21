import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
}

const CheckedIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={24}
    height={17}
    viewBox="0 0 24 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M23.438.742c.75.722.75 1.888 0 2.61L10.952 16.459a1.968 1.968 0 0 1-2.711 0L.562 9.068a1.796 1.796 0 0 1 0-2.61c.75-.722 1.873-.981 2.622-.26l2.957 2.87 2.957 2.87L20.375.4c.75-.723 2.313-.382 3.063.341Z"
      fill="#253245"
   />
  </svg>
)

export default CheckedIcon

import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
}

const CircledRightArrowIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={16} cy={16} r={16} fill="#253245" />
    <path
      d="m21.68 15.293-4.364-4a1.162 1.162 0 0 0-1.542 0 .942.942 0 0 0 0 1.414L18.278 15H11.09c-.603 0-1.091.447-1.091 1 0 .554.488 1 1.091 1h7.187l-2.502 2.294a.942.942 0 0 0 0 1.414c.426.39 1.116.39 1.543 0l4.364-4a.943.943 0 0 0-.003-1.414Z"
      fill="#fff"
    />
  </svg>
)

export default CircledRightArrowIcon

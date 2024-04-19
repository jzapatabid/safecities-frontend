import { SVGProps } from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
}

const AlertError = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 15H9v-2h2v2Zm0-4H9V5h2v6Z"
      fill="#FF185D"
    />
  </svg>
)

export default AlertError

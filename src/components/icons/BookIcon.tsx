import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
}

const BookIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={19}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#a)">
      <path
        d="M18.411 13.781V1.97A1.97 1.97 0 0 0 16.438 0h-1.972v7.838c0 .55-.638.856-1.032.512l-2.256-1.787-2.256 1.825c-.395.34-1.032.037-1.032-.55V0H3.945A3.941 3.941 0 0 0 0 3.938v13.124A3.941 3.941 0 0 0 3.945 21h13.15c.727 0 1.316-.588 1.316-1.313 0-.48-.272-.882-.658-1.111v-3.337c.403-.359.658-.875.658-1.458Zm-2.63 4.594H3.945a1.314 1.314 0 0 1-1.315-1.313c0-.724.589-1.312 1.315-1.312h11.836v2.625Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18.411v21H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default BookIcon

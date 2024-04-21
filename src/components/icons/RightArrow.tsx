import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
}

const RightArrow = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={29}
    height={23}
    viewBox="0 0 29 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      style={{
        transition: 'all 0.3s ease'
      }}
      d="m17.806.563 9.688 9.583a1.897 1.897 0 0 1 .002 2.709l-9.688 9.583a1.952 1.952 0 0 1-2.74 0 1.902 1.902 0 0 1 0-2.71l6.383-6.311H2.875a1.869 1.869 0 0 1-1.883-1.863c0-1.005.812-1.97 1.883-1.97h18.576L15.069 3.27a1.902 1.902 0 0 1 0-2.71 1.948 1.948 0 0 1 2.737.003Z"
      fill={props.fill || '#253245'}
   />
  </svg>
)

export default RightArrow

import { LegacyRef, SVGProps, forwardRef } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  color?: string
}

const LeftArrow = (
  {
    title,
    titleId,
    color = '#FFFFFF',
    ...props
  }: SVGProps<SVGSVGElement> & SVGRProps,
  ref: LegacyRef<SVGSVGElement> | undefined
) => (
  <svg
    ref={ref}
    width={props.width || 38}
    height={props.height || 38}
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
    fill="none"
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M30.084 19H7.916M19 30.083 7.917 19 19 7.917"
      stroke={color}
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
   />
  </svg>
)

export default forwardRef(LeftArrow)

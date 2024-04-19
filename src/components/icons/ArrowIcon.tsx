import React, { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  active?: boolean
  desc?: boolean
}

const ArrowIcon = ({
  title,
  titleId,
  desc = true,
  active = false,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const rotateValue = (active && desc) || !active ? 0 : 180

  return (
    <svg
      style={{
        transform: `rotate(${rotateValue}deg)`,
        transition: 'all 0.3s ease'
      }}
      width={12}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M10.59.59 6 5.17 1.41.59 0 2l6 6 6-6L10.59.59Z"
        fill={active ? '#fff' : '#555555'}
      />
    </svg>
  )
}

export default ArrowIcon

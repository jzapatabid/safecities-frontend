import { SVGProps } from 'react'

const PlanejamentoIcon = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.3999 28C3.86657 28 3.3999 27.8 2.9999 27.4C2.5999 27 2.3999 26.5333 2.3999 26V6C2.3999 5.46667 2.5999 5 2.9999 4.6C3.3999 4.2 3.86657 4 4.3999 4H27.5999C28.1332 4 28.5999 4.2 28.9999 4.6C29.3999 5 29.5999 5.46667 29.5999 6V26C29.5999 26.5333 29.3999 27 28.9999 27.4C28.5999 27.8 28.1332 28 27.5999 28H4.3999ZM4.3999 26H27.5999V6H4.3999V26ZM6.66657 22.6667H13.3332V20H6.66657V22.6667ZM19.3999 20L25.9999 13.4L24.0999 11.5L19.3999 16.2333L17.4999 14.3333L15.6332 16.2333L19.3999 20ZM6.66657 17.3333H13.3332V14.6667H6.66657V17.3333ZM6.66657 12H13.3332V9.33333H6.66657V12Z"
      fill="white"
    />
  </svg>
)

export default PlanejamentoIcon

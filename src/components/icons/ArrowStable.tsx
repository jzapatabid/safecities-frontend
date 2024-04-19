export default function ArrowStable({ status }: any) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10H22"
        stroke={status === 2 ? '#FF5C00' : '#555555'}
        strokeWidth="3"
      />
    </svg>
  )
}

import { withSSRAuth } from 'utils/withSSRAuth'

export default function PlanPage() {
  return null
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    redirect: {
      destination: '/planejamento/plan-diagnostic-summary/problem-diagnosis',
      permanent: false
    }
  }
})

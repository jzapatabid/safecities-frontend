import { withSSRAuth } from 'utils/withSSRAuth'

export default function PlanStrategyDimensionPageProps() {
  return <></>
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    redirect: {
      destination: '/planejamento/plan-strategy-dimension/macro-objectives',
      permanent: false
    }
  }
})

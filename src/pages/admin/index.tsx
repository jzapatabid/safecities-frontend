import { withSSRAuth } from 'utils/withSSRAuth'

export default function AdminPage() {
  return null
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    redirect: {
      destination: '/admin/manage-users',
      permanent: false
    }
  }
})

import { SET_NEW_PASSWORD_PAGE } from 'enums/Auth'

import ResetPassword from 'templates/SetNewPassword'
import { withSSRGuest } from 'utils/withSSRGuest'

export default function FirstAccessPage() {
  return <ResetPassword type={SET_NEW_PASSWORD_PAGE.FIRST_ACCESS}/>
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})

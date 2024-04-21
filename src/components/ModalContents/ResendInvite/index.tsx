import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

import { useAdminData } from 'contexts/Admin'
import { useModal } from 'contexts/Modal'

import { getAPIClient } from 'services/axios'
import { resendInvite } from 'services/manage-users'

import ResendInviteTable from './table'

import Notification from 'components/Notifications'

const ResendInviteModalContent = () => {
  const { setModalState } = useModal()
  const { adminState } = useAdminData()
  const apiClient = getAPIClient()

  const handleSendInvites = useCallback(
    (invites) => async () => {
      try {
        await resendInvite({
          api: apiClient,
          ids: invites.map((user: any) => user.id)
        })
        toast.custom((t) => (
          <Notification
            id={t.id}
            text={'O convite foi enviado corretamente'}
            variant="success"
          />
        ))
        setModalState({ open: false })
      } catch (err) {
        toast.custom((t) => (
          <Notification
            id={t.id}
            text={
              'Não foi possível reenviar os convites. Tente novamente em algum momento'
            }
            variant="warning"
          />
        ))
        setModalState({ open: false })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      onCancel: () => setModalState({ open: false }),
      onConfirm: handleSendInvites(adminState.resendInviteSelectedUsers)
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setModalState((state) => ({
      ...state,
      onConfirm: handleSendInvites(adminState.resendInviteSelectedUsers)
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminState.resendInviteSelectedUsers])

  return (
    <>
      <ResendInviteTable data={adminState.selectedUsers} />
    </>
  )
}

export default ResendInviteModalContent

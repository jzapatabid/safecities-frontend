import React, { useState } from 'react'

type modalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: modalProps) {
  const [isDialogSupported] = useState(
    () => 'show' in window.document.createElement('dialog')
  )

  const handleClose = () => {
    onClose && onClose()
  }

  if (!isDialogSupported) {
    return isOpen ? (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal">
          <button className="modal-close" onClick={handleClose}>
            X
          </button>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    ) : null
  }

  return isOpen ? (
    <dialog open className="modal-dialog">
      <button className="modal-close" onClick={handleClose}>
        X
      </button>
      {children}
    </dialog>
  ) : null
}

export default Modal

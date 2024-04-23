import React, { createContext, useState, useContext } from 'react'

import { ModalContextProps, ModalStateTypes } from 'types/Modal'

import Modal from 'components/Modal'
import LanguageProvider from 'contexts/LanguageSelector'

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

const useModal = () => useContext(ModalContext)

const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState({} as ModalStateTypes)
  console.log("This Is  modalState:", modalState)
  return (
    <LanguageProvider>
      <ModalContext.Provider value={{ modalState, setModalState }}>
          {children}
          <Modal type={modalState.type} />
      </ModalContext.Provider>
    </LanguageProvider>
  )
}

export { ModalContext, ModalProvider, useModal }

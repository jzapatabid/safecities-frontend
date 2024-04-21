import React, { createContext, useState, useContext } from 'react'

import { ModalContextProps, ModalStateTypes } from 'types/Modal'

import Modal from 'components/Modal'
import LanguageProvider from 'contexts/LanguageSelector'

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

const useModal = () => useContext(ModalContext)

const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState({} as ModalStateTypes)

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <LanguageProvider>
        {children}
        <Modal type={modalState.type}/>
      </LanguageProvider>

      
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider, useModal }

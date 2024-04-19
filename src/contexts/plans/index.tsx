import React, { createContext, useState, useContext } from 'react'

import { PlansContextProps, PlansStateTypes } from 'types/Plans'

import initialState from './initialState'

const PlansContext = createContext<PlansContextProps>({} as PlansContextProps)

const usePlans = () => useContext(PlansContext)

const PlansProvider: React.FC = ({ children }) => {
  const [plansState, setPlansState] = useState(initialState as PlansStateTypes)

  return (
    <PlansContext.Provider value={{ plansState, setPlansState }}>
      {children}
    </PlansContext.Provider>
  )
}

export { PlansContext, PlansProvider, usePlans }

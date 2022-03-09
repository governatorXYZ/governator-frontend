import React from 'react'

import GovReducer from './store'

/* This provides a global state management for the App */
const GovBotContext = React.createContext({})

interface T_crumbs {
  name: string
  href: string
}
;[]

const crumbs: T_crumbs = [
  {
    name: 'Servers',
    href: '/server-select',
  },
]




export default function GovBotProvider({children}) {

    const [state, dispatch] = React.useReducer(GovReducer, { crumbs })

    const value = { state, dispatch }
    
    return (
      <GovBotContext.Provider value={value}>
        {children}
      </GovBotContext.Provider>
    )
  
}

export { GovBotContext }
export type { T_crumbs }

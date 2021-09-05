import { Template } from '@/uibox/common/interfaces'
import React, { createContext, useState, useContext, FC } from 'react'

interface AppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
  templates: Template[]
  setTemplates: (templates: Template[]) => void
}

const Context = createContext<AppContext>({
  isMobile: false,
  setIsMobile: () => {},
  templates: [],
  setTemplates: (templates: Template[]) => {},
})

export const AppProvider: FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(undefined)
  const [templates, setTemplates] = useState<Template[]>([])
  const context = { isMobile, setIsMobile, templates, setTemplates }
  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useAppContext() {
  const { isMobile, setIsMobile, templates, setTemplates } = useContext(Context)
  return { isMobile, setIsMobile, templates, setTemplates }
}

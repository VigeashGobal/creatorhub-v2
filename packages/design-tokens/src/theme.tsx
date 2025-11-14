import React, { createContext, useContext } from 'react'
import { colors } from './tokens'

type Theme = {
  colors: typeof colors
}

const ThemeContext = createContext<Theme>({ colors })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export default ThemeProvider


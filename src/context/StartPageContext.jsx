import { createContext, useState } from "react"

export const StartPageContext = createContext()

export const StartPageInfo = ({ children }) => {
  const [startPage, setStartPage] = useState(true)

  return (
    <StartPageContext.Provider value={{ startPage, setStartPage }}>
      {children}
    </StartPageContext.Provider>
  )
}


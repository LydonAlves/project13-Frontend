import { createContext, useEffect, useState } from "react"

export const StartPageContext = createContext()

export const StartPageInfo = ({ children }) => {
  const [startPage, setStartPage] = useState(true)

  useEffect(() => {
    const onStartPage = JSON.parse(localStorage.getItem("startPage"))
    setStartPage(onStartPage)
  }, [])



  return (
    <StartPageContext.Provider value={{ startPage, setStartPage }}>
      {children}
    </StartPageContext.Provider>
  )
}


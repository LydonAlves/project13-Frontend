import React, { createContext, useState } from "react"

export const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.slice(-2)
  const day = `0${d.getDate()}`.slice(-2)
  return `${year}-${month}-${day}`
}

export const DateContext = createContext()

const DateProvider = ({ children }) => {
  const [currentDate, setCurrentdate] = useState(new Date())
  const date = currentDate.toISOString()
  return (
    <DateContext.Provider value={date}>{children}</DateContext.Provider>
  )
}

export default DateProvider

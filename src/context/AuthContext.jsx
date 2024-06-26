import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"))
    if (userData) {
      let user = userData.user
      setUserObj(user)
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    let user = userData.user
    setUserObj(user)
  }

  const logout = () => {
    localStorage.removeItem
      ("user")
    setUserObj(null)
  }

  return (
    <AuthContext.Provider value={{ userObj, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
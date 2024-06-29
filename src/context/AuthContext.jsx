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
    localStorage.setItem("startPage", JSON.stringify(false))
    localStorage.setItem("user", JSON.stringify(userData))
    let user = userData.user
    setUserObj(user)
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("startPage")
    localStorage.removeItem("answersVideo")
    localStorage.removeItem("answersGapFill")
    setUserObj(null)
  }

  const updateUser = (key, value) => {
    setUserObj((prevUserObj) => {
      const updatedUser = { ...prevUserObj, [key]: value };
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        userData.user = updatedUser;
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return updatedUser;
    });
  };


  return (
    <AuthContext.Provider value={{ userObj, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
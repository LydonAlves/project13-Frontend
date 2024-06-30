import { NavLink, useNavigate } from "react-router-dom"
import "./Header.css"
import React, { useContext, useEffect, useState } from "react"
import { links } from './linksArray/linksArray';
import { useAuth } from "../../context/AuthContext";
import { StartPageContext } from "../../context/StartPageContext";

const Header = () => {
  const { startPage } = useContext(StartPageContext)
  const [userRole, setUserRole] = useState("")
  const { userObj, logout } = useAuth()
  const { setStartPage } = useContext(StartPageContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (userObj) {
      const role = userObj.role;
      setUserRole(role);
    }
  }, [userObj])

  const handleLogout = () => {
    logout()
    setStartPage(true)
    navigate('/')
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      {startPage === false && (
        <header>
          <div onClick={() => openMenu()}>
            <img
              src="./assets/menu.png"
              alt="menu-button"
              className={`menuButton ${menuVisible ? 'visibleClass' : ''}`}
            />
          </div>
          <div className="whiteLogoDiv">
            <img src="./assets/login/logoWhiteHorizontal.png" alt="white logo" className="headingLogo" />
          </div>
          <div className={`menuDiv ${menuVisible ? 'visible' : 'hidden'}`}>
            <ul className="menuList">
              {links.map((link, index) => {
                if (link.roles.includes(userRole)) {
                  return (
                    <React.Fragment key={index}>
                      <li className='headerLink'>
                        <NavLink
                          to={link.path}
                          activeclassname='active'
                          className='headerLink'
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </ul>
            <div className='logUserButton'>
              {userObj && (
                <div className="loguserDiv">
                  <img src="./assets/login/logout.png" alt="logoutImg" className="logoutImg" />
                  <button onClick={() => handleLogout()} className='logoutButton'>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  )

}

export default Header


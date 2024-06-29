import { useContext } from "react"
import "./Footer.css"
import { StartPageContext } from "../../context/StartPageContext"

const Footer = () => {
  const { startPage } = useContext(StartPageContext)

  return (
    <>
      {startPage === false && (
        <footer>
          <div className="footerDiv">
            <p>English Online Learning &copy; 2024. All rights reserved</p>
          </div>
        </footer>
      )}
    </>
  )
}

export default Footer 
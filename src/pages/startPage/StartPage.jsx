import { useNavigate } from "react-router-dom"
import ImageSlider from "./ImageSlider/ImageSlider"
import "./StartPage.css"

const StartPage = () => {
  const navigate = useNavigate()
  const startFunction = () => {
    navigate('api/v1/login-register')
  }

  return (
    <section className="startPageSection">
      <div className="startPageDiv">
        <img className="logoStartPage" src="./assets/login/logo.png" alt="logo" />
        <div className="startPageTextDiv">
          <h1 className="welcomeH1">WELCOME</h1>
          <p className="welcomeText">Empower your teaching with the innovative power of AI. Our platform is designed to help teachers create top-notch grammar and speaking exercises effortlessly.</p>
          <button
            className="largeGreenButton"
            onClick={() => startFunction()}
          >LOGIN/REGISTER</button>
        </div>
      </div>
      <ImageSlider />
    </section>
  )
}

export default StartPage

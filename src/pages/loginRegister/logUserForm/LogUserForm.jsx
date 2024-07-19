import { CountryDropdown } from 'react-country-region-selector'
import './LogUserForm.css'

const LogUserForm = ({ submitForm, isRegister, loginRegisterFormObj, registerFormObj }) => {

  const setUserName = registerFormObj?.setUserName || (() => { });
  const userName = registerFormObj?.userName || '';
  const setCountry = registerFormObj?.setCountry || (() => { });
  const country = registerFormObj?.country || '';
  const setRepeatPassword = registerFormObj?.setRepeatPassword || (() => { });
  const repeatPassword = registerFormObj?.repeatPassword || '';

  const { setEmail, email, setPassword, password, setShowPassword, showPassword } = loginRegisterFormObj

  const buttonText = isRegister === true ? 'Register' : 'Login'


  return (
    <form onSubmit={submitForm} className="loginForm">
      {isRegister && (
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {isRegister && (
        <div className="countryDiv">
          <CountryDropdown
            className="country"
            value={country}
            onChange={(val) => setCountry(val)}
          />
        </div>
      )}

      <div className="passwordDiv">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="passwordInput"
        />
        <img
          onClick={setShowPassword}
          src="./assets/login/eye.png"
          alt="eye"
          className={`eyeImg ${showPassword == true ? "eyeSelected" : ""}`}
        />
      </div>
      {isRegister && (
        <div className="passwordDiv">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="passwordInput"
          />
        </div>
      )}
      <button className="primaryGreenButton" type="submit">{buttonText}</button>
    </form>
  )
}

export default LogUserForm
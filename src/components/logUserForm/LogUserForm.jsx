import { CountryDropdown } from 'react-country-region-selector'
import './LogUserForm.css'
import { submitForm } from '../../functions/loginFunctions/submitLoginRegister';
import useToggle from './../../hooks/useToggle';


const LogUserForm = ({
  isRegister,
  stateLoginRegister,
  dispatch,
  setLoading,
  login
}) => {
  const [showPassword, setShowPassword] = useToggle();
  const { userName, country, email, password, repeatPassword } = stateLoginRegister
  const registerObj = { userName, email, password, repeatPassword, country, login }
  const handleChange = (payloadKey) => (e) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { payloadKey, value: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(isRegister, setLoading, dispatch, registerObj)
  }

  const buttonText = isRegister === true ? 'Register' : 'Login'


  return (
    <form onSubmit={handleSubmit} className="loginForm">
      {isRegister && (
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={handleChange('userName')}
        />
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={handleChange('email')}
      />

      {isRegister && (
        <div className="countryDiv">
          <CountryDropdown
            className="country"
            value={country}
            onChange={(value) => dispatch({ type: 'SET_COUNTRY', payload: value })}
          />
        </div>
      )}

      <div className="passwordDiv">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={handleChange('password')}
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
            onChange={handleChange('repeatPassword')}
            className="passwordInput"
          />
        </div>
      )}
      <button className="primaryGreenButton" type="submit">{buttonText}</button>
    </form>
  )
}

export default LogUserForm
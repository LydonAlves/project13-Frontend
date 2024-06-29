import { useContext, useEffect, useState } from "react";
import "./LoginRegister.css"
import { CountryDropdown } from "react-country-region-selector";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../context/AuthContext";
import ToggleButton from "./loginComponents/ToggleButton";
import { toast } from "react-toastify";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { StartPageContext } from './../../context/StartPageContext';
import { backendURL } from "../../utils/backendURL";

const LoginRegister = () => {
  const [register, toggleRegister] = useToggle();
  const [country, setCountry] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useToggle();
  const { setStartPage } = useContext(StartPageContext)
  const { userObj, login } = useAuth()
  const navigate = useNavigate()

  const submitLogin = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    };

    setLoading(true)
    try {
      const response = await fetch(`${backendURL}user/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("The password or username you have entered is not correct");
        } else {
          throw new Error(result.error || "An unknown error occurred");
        }
      } else {
        login(result);
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const headers = {
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(`${backendURL}user/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ userName, email, password, country })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      login(data)
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };


  useEffect(() => {
    if (userObj) {
      setUserLoggedIn(userObj)
      if (userObj.role === "admin" || userObj.role === "teacher") {
        navigate('/create-exercise')
        setStartPage(false)
      } else {
        navigate('/students-page')
        setStartPage(false)
      }
    }
  }, [userObj])


  return (
    <section className="loginSection">
      <Loading
        loading={loading}
      />
      <div className="loginContainer">
        <div className="loginImgDiv">
          <img className="loginImg" src="/assets/login/loginImg.jpg" alt="loginImg" />
        </div>

        <div className="loginDiv">
          <div className="innerLoginDiv">
            <div className="logoDiv">
              <img className="loginLogo" src="./assets/login/logo.png" alt="Logo" />
            </div>
            {!userLoggedIn && (
              <p className="signInTitle">{!register ? 'Sign into your account' : 'Register an account'}</p>
            )}
            {!register && (

              <form onSubmit={submitLogin} className="loginForm" >
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

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
                <button className="loginButton" type="submit">LOGIN</button>
              </form>
            )}

            {register && (
              <form onSubmit={submitRegister} className="loginForm">
                <input
                  type="text"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="countryDiv">
                  <CountryDropdown
                    className="country"
                    value={country}
                    onChange={(val) => setCountry(val)}
                  />
                </div>
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
                <div className="passwordDiv">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="passwordInput"
                  />
                </div>
                <button className="primaryGreenButton" type="submit">Register</button>
              </form>
            )}

            <div>
              {register && (
                <p className="loginRegisterQuestion">
                  Have an account? Login <ToggleButton toggleRegister={toggleRegister} />
                </p>
              )}
              {!register && !userLoggedIn && (
                <p className="loginRegisterQuestion">
                  Don't have an account? Register <ToggleButton toggleRegister={toggleRegister} />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default LoginRegister; 
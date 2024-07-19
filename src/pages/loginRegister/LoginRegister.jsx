import { useContext, useEffect, useState } from "react";
import "./LoginRegister.css"
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { StartPageContext } from './../../context/StartPageContext';
import { SuccessfullRegistration } from "./loginComponents/successfullRegistration/SuccessfullRegistration";
import { registerFunction } from './../../utils/register';
import { loginFunction } from "../../utils/login";
import LogUserForm from "./logUserForm/LogUserForm";

const LoginRegister = () => {
  const [register, toggleRegister] = useToggle();
  const [country, setCountry] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const [registrationData, setRegistrationData] = useState()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useToggle();
  const { setStartPage } = useContext(StartPageContext)
  const { userObj, login } = useAuth()
  const navigate = useNavigate()
  const registerObj = { userName, email, password, country }

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await loginFunction(registerObj)
      login(result);
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
      toast.error(`Error: the passwords don't match`);
      return;
    }
    setLoading(true)
    try {
      const result = await registerFunction(registerObj);
      setRegistrationData(result);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error: registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userObj) {
      setUserLoggedIn(userObj)
      if (userObj.role === "admin" || userObj.role === "teacher") {
        navigate('/create-exercise')
        setStartPage(false)
      } else if (userObj && !userObj.classGroup) {
        navigate('/join-class')
        setStartPage(false)
      } else {
        navigate('/students-page')
        setStartPage(false)
      }
    }
  }, [userObj])

  const registerFormObj = { setUserName, userName, setCountry, country, setRepeatPassword, repeatPassword }
  const loginRegisterFormObj = { setEmail, email, setPassword, password, setShowPassword, showPassword }


  return (
    <section className="loginSection">
      <Loading
        loading={loading}
      />
      {registrationData && (
        <SuccessfullRegistration
          userData={registrationData}
          login={login}
          setRegistrationData={setRegistrationData}
          toggleRegister={toggleRegister}
        />
      )}
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
              <LogUserForm
                submitForm={submitLogin}
                isRegister={register}
                loginRegisterFormObj={loginRegisterFormObj}
              />
            )}
            {register && (
              <LogUserForm
                submitForm={submitRegister}
                isRegister={register}
                loginRegisterFormObj={loginRegisterFormObj}
                registerFormObj={registerFormObj}
              />
            )}
            <div>
              {register && (
                <p className="loginRegisterQuestion">
                  Have an account? Login <button onClick={() => toggleRegister()} className="switchLogRegButton">here</button>
                </p>
              )}
              {!register && !userLoggedIn && (
                <p className="loginRegisterQuestion">
                  Don't have an account? Register <button onClick={() => toggleRegister()} className="switchLogRegButton">here</button>
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
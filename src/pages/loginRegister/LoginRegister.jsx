import { useContext, useEffect, useReducer, useState } from "react";
import "./LoginRegister.css"
import { INITIAL_LOGIN_REGISTER, loginRegisterReducer } from "../../reducers/loginRegisterReducer";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { StartPageContext } from './../../context/StartPageContext';
import { SuccessfullRegistration } from "../../components/successfullRegistration/SuccessfullRegistration";
import LogUserForm from "../../components/logUserForm/LogUserForm";

const LoginRegister = () => {
  const { setStartPage } = useContext(StartPageContext)
  const { userObj, login } = useAuth()
  const navigate = useNavigate()
  const [stateLoginRegister, dispatchLoginRegister] = useReducer(loginRegisterReducer, INITIAL_LOGIN_REGISTER)
  const [register, toggleRegister] = useToggle();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userObj) {
      dispatchLoginRegister({ type: 'SET_USER_LOGGED_IN', payload: userObj })
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


  return (
    <section className="loginSection">
      <Loading
        loading={loading}
      />
      {stateLoginRegister.registrationData && (
        <SuccessfullRegistration
          userData={stateLoginRegister.registrationData}
          login={login}
          dispatch={dispatchLoginRegister}
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

            {!stateLoginRegister.userLoggedIn && (
              <p className="signInTitle">{!register ? 'Sign into your account' : 'Register an account'}</p>
            )}
            {!register && (
              <LogUserForm
                isRegister={register}
                stateLoginRegister={stateLoginRegister}
                dispatch={dispatchLoginRegister}
                setLoading={setLoading}
                login={login}

              />
            )}
            {register && (
              <LogUserForm
                isRegister={register}
                stateLoginRegister={stateLoginRegister}
                dispatch={dispatchLoginRegister}
                setLoading={setLoading}
                login={login}
              />
            )}
            <div>
              {register && (
                <p className="loginRegisterQuestion">
                  Have an account? Login <button onClick={() => toggleRegister()} className="switchLogRegButton">here</button>
                </p>
              )}
              {!register && !stateLoginRegister.userLoggedIn && (
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
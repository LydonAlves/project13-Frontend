import './SuccessfullRegistration.css'

export const SuccessfullRegistration = ({ login, userData, dispatch, toggleRegister }) => {

  const proceedToLogin = () => {
    login(userData)
    dispatch({ type: 'SET_REGISTRATION_DATA', payload: null })
    toggleRegister()
  }

  return (
    <div className="successfulRegistrationDiv">
      <h1 className="registrationH1">Congratulations!</h1>
      <p className="registrationText">Your registration has been successful!</p>
      <button onClick={() => proceedToLogin()} className="successfulRegButton">Continue</button>
    </div>
  )
}

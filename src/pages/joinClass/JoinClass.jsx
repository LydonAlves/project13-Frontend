import { useEffect, useRef, useState } from "react"
import "./JoinClass.css"
import { useAuth } from './../../context/AuthContext';
import Loading from './../../components/loading/Loading';
import useToggle from './../../hooks/useToggle';
import NoClassGroupPopup from "../../components/noClassGroup/NoClassGroupPopup";
import SuccessfullyJoinedComponent from "../../components/successfullyJoinedComponent/SuccessfullyJoinedComponent";
import { setupClasses } from './../../functions/joinClassFunctions/setupClassJoinClass';
import { submitId } from './../../functions/joinClassFunctions/submitIdJoinClass';

const JoinClass = () => {
  const { userObj, updateUser } = useAuth()
  const [currentClass, setCurrentClass] = useState()
  const [loading, setLoading] = useState(false)
  const [successfullyJoined, setSuccessfullyJoined] = useToggle()
  const idInputRef = useRef()

  useEffect(() => {
    if (userObj) {
      setupClasses(userObj, setCurrentClass, setLoading)
    }
  }, [userObj])

  const handleSubmitId = (submittedID) => {
    submitId(userObj, updateUser, setLoading, submittedID, setSuccessfullyJoined)
  }

  return (
    <section className="joinClassSection">
      <Loading
        loading={loading}
      />

      {userObj && !userObj.classGroup && (
        <NoClassGroupPopup
          setSuccessfullyJoined={setSuccessfullyJoined}
          updateUser={updateUser}
          handleSubmitId={handleSubmitId}
        />
      )}

      {successfullyJoined === true && (
        <SuccessfullyJoinedComponent
          setSuccessfullyJoined={setSuccessfullyJoined}
        />
      )}

      <h1 className="joinClassH1">Join Class</h1>
      <div className="joinClassDiv">
        {currentClass && (
          <div className="joinClassWelcomeDiv">
            <p className="joinClassWelcomeTitle">Hi, {userObj.userName}</p>
            {currentClass == undefined ?
              <p className="joinClassWelcomeMessage"> You are not currently part any class</p> :
              <p className="joinClassWelcomeMessage">
                You are currently part of <span className="classGroupNameJoinClass">{currentClass.name}</span></p>
            }
          </div>
        )}
        {currentClass == undefined ? (
          <p className="joinClassInputInstructions">Add the Id of the class you'd like to join below</p>
        ) : (
          <p className="joinClassInputInstructions">You can change to a different class by adding the class code below</p>
        )}

        <input className="joinClassInput" type="text" ref={idInputRef} />
        <button onClick={() => handleSubmitId(idInputRef.current.value)} className="largeBlueButton submitJoinClassButton">Submit</button>
      </div>
    </section>

  )
}

export default JoinClass
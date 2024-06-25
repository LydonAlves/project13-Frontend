import { useEffect, useRef, useState } from "react"
import "./JoinClass.css"
import { useAuth } from './../../context/AuthContext';
import { fetchById } from "../../utils/fetchById";
import { updateUserClassGroup } from "./joinClassFunctions/updateUserClassGroup";
import Loading from './../../components/loading/Loading';
import { toast } from "react-toastify";

const JoinClass = () => {
  const [operationSuccess, setOperationSuccess] = useState(false)
  const [currentClass, setCurrentClass] = useState()
  const [loading, setLoading] = useState(false)
  const { userObj } = useAuth()
  const idInputRef = useRef()

  //! Error settings done
  const submitId = async () => {
    let classId = idInputRef.current.value
    let userId = userObj.user._id
    setLoading(true)

    try {
      const result = await updateUserClassGroup(userId, classId)
      if (result.error) {
        throw new Error(result.error);
      } else {
        if (result.classGroup) {
          setOperationSuccess(true)
        }
      }
    } catch (error) {
      console.error('Error updating the class group:', error);
      toast.error(`Error: We had some difficulty loading data`)
    } finally {
      setLoading(false)
    }
  }

  //! Error settings done
  useEffect(() => {
    const fetchClass = async () => {
      setLoading(true)
      try {
        const result = await fetchById("classGroup", userObj.classGroup)
        if (result.error) {
          throw new Error(result.error);
        } else {
          setCurrentClass(result)
        }
      } catch (error) {
        console.error('Error fetching the class group:', error);
        toast.error(`Error: We had some difficulty loading data`)
      } finally {
        setLoading(false)
      }
    }
    if (userObj) {
      fetchClass()
    }
  }, [userObj])

  return (
    <section className="joinClassSection">
      <Loading
        loading={loading}
      />
      <h1 className="joinClassH1">Join Class</h1>
      <div className="joinClassDiv">
        {currentClass && (
          <div className="joinClassWelcomeDiv">
            <p className="joinClassWelcomeTitle">Hi, {userObj.userName}</p>
            {currentClass && currentClass.length > 0 ?
              <p className="joinClassWelcomeMessage"> You are not currently part any class</p> :
              <p className="joinClassWelcomeMessage">
                You are currently part of <span className="classGroupNameJoinClass">{currentClass.name}</span></p>
            }
          </div>
        )}
        {currentClass && currentClass.length > 0 ? (
          <p className="joinClassInputInstructions">Add the Id of the class you'd like to join below</p>
        ) : (
          <p className="joinClassInputInstructions">You can change to a different class by adding the class code below</p>
        )}

        <input className="joinClassInput" type="text" ref={idInputRef} />
        <button onClick={() => submitId()} className="largeBlueButton submitJoinClassButton">Submit</button>
        {operationSuccess === true && (
          <p>You have successfully joined a new Class Group</p>
        )}
      </div>
    </section>

  )
}

export default JoinClass
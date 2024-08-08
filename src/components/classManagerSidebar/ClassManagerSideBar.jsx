
import { useRef, } from 'react'
import './ClassManagerSideBar.css'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { saveNewClassGroup } from '../../functions/classManagerFunctions/saveNewClassGroup';
import Calendar from '../calendar/Calendar';
import { saveClassesUpdated } from './../../functions/classManagerFunctions/saveClassesUpdated';

const ClassManagerSideBar = ({ dispatch, state, setLoading, userObj }) => {
  const activateSaveButton = state.classList !== state.classByDate
  const classNameRef = useRef()

  const createNewClass = async () => {
    if (classNameRef.current.value !== "") {
      let classGroup = {
        activityObj: null,
        id: uuidv4(),
        name: classNameRef.current.value,
        selected: false,
        createdBy: userObj._id
      }

      dispatch({ type: 'UPDATE_CLASS_LIST', payload: classGroup })

      setLoading(true)
      try {
        const result = await saveNewClassGroup(classGroup)

        if (result.error) {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Error saving new class group:', error);
        toast.error(`Error: Failed to save new class group`)
      } finally {
        setLoading(false)
        classNameRef.current.value = ""
      }
    }
  }

  const handleSaveClassesUpdated = () => {
    setLoading(true)
    saveClassesUpdated(dispatch, state, userObj)
    setLoading(false)
  }


  return (
    <div className="calendarAndCreateClassInputDiv">
      <h1 className="classDetailsTitle">CLASS DETAILS</h1>
      <p className='classDetailsExplanation'>Choose the date you want to assing activities to</p>
      <div className="calendarAndInputsDiv">
        <Calendar
          dispatch={dispatch}
        />
        <div className="inputsContainerClassManager">

          <div className="createClassInputDiv">
            <p className="createClassInputTitle">Create a new class group</p>
            <div className="createClassDiv">
              <input type="text" ref={classNameRef} className="createClassInput" />
              <button
                className="saveChangesButton"
                onClick={() => createNewClass()}
              >Submit</button>
            </div>
          </div>

          {activateSaveButton === true && (
            <div className="saveChangesButtonDivMyClass">
              <p className="saveChangesTextMyClass">Save changes made to the classes</p>
              <button
                className="saveChangesButton"
                onClick={() => handleSaveClassesUpdated()}
              >Save changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClassManagerSideBar
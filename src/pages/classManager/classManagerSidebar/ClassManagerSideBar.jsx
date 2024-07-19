import Calendar from '../../../components/calendar/Calendar'
import './ClassManagerSideBar.css'

const ClassManagerSideBar = ({ sideBarObj }) => {

  const { setDateSelected, setClassesForDay, classNameRef, createNewClass, updateNeeded, saveClassesUpdated } = sideBarObj

  return (
    <div className="calendarAndCreateClassInputDiv">
      <h1 className="classDetailsTitle">CLASS DETAILS</h1>
      <p>Choose the date you want to assing activities to</p>
      <div className="calendarAndInputsDiv">
        <Calendar
          setDateSelected={setDateSelected}
          setClassesForDay={setClassesForDay}
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

          {updateNeeded === true && (
            <div className="saveChangesButtonDivMyClass">
              <p className="saveChangesTextMyClass">Save changes made to the classes</p>
              <button
                className="saveChangesButton"
                disabled={updateNeeded === false}
                onClick={() => saveClassesUpdated()}
              >Save changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClassManagerSideBar
import { useState } from "react"
import "./CreateSelectClass.css"
import { toast } from "react-toastify";
import useToggle from "../../hooks/useToggle";
import { deleteByIdinDB } from "../../utils/deleteById";
import Loading from "../loading/Loading";

const CreateSelectClass = ({
  dispatch,
  classList,
}) => {
  const [seeClassCodeToggle, setSeeClassCodeToggle] = useToggle(false)
  const [classIndex, setClassIndex] = useState()

  const classesToUpdate = (classItem) => {
    const selectedClasses = classList.filter(classItem => classItem.selected === true)
    const isIdUnique = !selectedClasses.some(item => item._id === classItem._id);
    if (isIdUnique) {
      dispatch({ type: 'SET_SELECTED_CLASS', payload: { _id: classItem._id } })
    } else {
      dispatch({ type: 'SET_SELECTED_CLASS', payload: { _id: classItem._id } })
    }
  }

  const removeActivity = (classItem) => {
    const itemToUpdate = classList.find(classListItem => classListItem._id === classItem._id)
    dispatch({ type: 'SET_REMOVE_CLASS_ACTIVITY', payload: { _id: itemToUpdate._id } })
  }

  const deleteClass = async (classId) => {
    Loading(true)
    try {
      await deleteByIdinDB("classGroup", classId)
      toast.success(`Success: Your class has successfully been deleted`)
      dispatch({ type: 'REMOVE_CLASS_FROM_LIST', payload: classId })
    } catch (error) {
      console.error("Failed to delete class group:", error);
      toast.error(`Error: We had some difficulty deleting this class`)
    }
    Loading(false)
  }

  const showClassCode = (index) => {
    setSeeClassCodeToggle()
    setClassIndex(prevIndex => (prevIndex === index ? "" : index))
  }

  return (
    <div className="createdClassContainer" >
      <div>
        <h1 className="classTitle">CLASS GROUPS</h1>
        <p className="classSubtitle">These are class groups created by you</p>
        <div className="classSelectContainer">
          <ul className="classSelectUl">
            {classList.length > 0 && (
              classList.map((classItem, index) => (
                <li key={classItem._id} className="createdClassDiv">
                  <p className="classNameCreateSelectClass">{classItem.name}</p>
                  {classItem.activityObj && (
                    <p className="assignedActivityTitle">  <strong>Assigned activity:</strong> {classItem.activityObj ? classItem.activityObj.title : ""}</p>)}
                  <div className={classItem.activityObj?.title && classItem.activityObj.title !== "" ? "buttonRemovePresent" : "buttonDivCreateSelectedClass"}>
                    {classItem.activityObj?.title && classItem.activityObj.title !== "" && (
                      <button className="classGroupButton" onClick={() => removeActivity(classItem)} >Remove activity</button>)}
                    <button
                      className={`classGroupButton ${classItem.selected === true ? "selectedClass" : ""}`}
                      onClick={() => classesToUpdate(classItem)}
                    >{classItem.selected === true ? "Selected" : "Select class"}</button>
                    <button className="classGroupButton deleteButton" onClick={() => deleteClass(classItem._id)}>Delete class</button>
                  </div>
                  <button onClick={() => showClassCode(index)} className="seeClassCodeButton primaryGreenButton">See class code</button>
                  {seeClassCodeToggle === true && index === classIndex && (<p className="seeClassCode"> <strong>Class code:</strong> {classItem._id} </p>)}
                </li>
              )))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CreateSelectClass
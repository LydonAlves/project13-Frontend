import { useEffect, useRef, useState } from "react"
import "./CreateSelectClass.css"
import useToggle from "../../../hooks/useToggle"
import { deleteById, deleteByIdinDB } from "../../../utils/deleteById";
import { removeClassFromActivitiesById } from "../classManagerFunctions/removeClassFromActivitiesById";
import { useAuth } from './../../../context/AuthContext';


const CreateSelectClass = ({ classList, setClassList, setUpdateClass, setUpdateRequired, dateSelected, }) => {
  const [seeClassCodeToggle, setSeeClassCodeToggle] = useToggle(false)
  const [selectedClasses, setSelectedClasses] = useState([])
  const [classIndex, setClassIndex] = useState()

  useEffect(() => {
    setSelectedClasses([])
  }, [dateSelected])


  const classesToUpdate = (classItem) => {
    const isIdUnique = !selectedClasses.some(item => item._id === classItem._id);
    if (isIdUnique) {
      setSelectedClasses(prev => {
        return [...prev, classItem]
      })

      setClassList(prev => {
        return prev.map(item => {
          if (item._id === classItem._id) {
            return { ...item, selected: false ? false : true }
          }
          return item
        })
      })
    } else {
      //todo: This was a problem in selecting and deselecting
      deleteById(classItem._id, setSelectedClasses)
      setClassList(prev => {
        return prev.map(item => {
          if (item._id === classItem._id) {
            return { ...item, selected: false ? true : false }
          }
          return item
        })
      })
    }
  }

  const removeActivity = (classItem) => {
    const itemToUpdate = classList.find(classListItem => classListItem._id === classItem._id)
    setClassList(prev => prev.map(classListItem => {
      if (classListItem === itemToUpdate) {
        return { ...classListItem, activityObj: null }
      } else {
        return classListItem
      }
    }))
    setUpdateClass(true)
  }

  const deleteClass = async (classId) => {

    try {
      await removeClassFromActivitiesById(classId)
      await deleteByIdinDB("classGroup", classId)
      setUpdateRequired(true)
    } catch (error) {
      console.error("Failed to delete class group:", error);
    }

  }

  const showClassCode = (index) => {
    setSeeClassCodeToggle()
    if (classIndex) {
      setClassIndex("")
    } else {
      setClassIndex(index)
    }
  }

  return (
    <div className="createdClassContainer" >
      <div>
        <h1 className="classTitle">CLASS GROUPS</h1>
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
                    <button className="classGroupButton" onClick={() => classesToUpdate(classItem)}>{classItem.selected === true ? "Selected" : "Select class"}</button>
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
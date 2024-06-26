import { useEffect, useRef, useState } from "react"
import "./ClassManager.css"
import CreateSelectClass from "./createSelectClass/CreateSelectClass"
import Calendar from "../../components/calendar/Calendar"
import { fetchAll } from "../../utils/fetchAll"
import { updateById } from '../../utils/updateById';
import { deleteByIdinDB } from "../../utils/deleteById"
import { formatDate } from './../../context/DateContext';
import StudentsPage from "../studentsPage/StudentsPage"
import { saveActivityToClassGroup } from "./classManagerFunctions/saveActivityToClassGroup"
import { useAuth } from "../../context/AuthContext"
import { fetchByUser } from "../../utils/fetchByUser"
import ShowActivities from "./showActivities/ShowActivities"
import { saveNewClassGroup } from "./classManagerFunctions/saveNewClassGroup"
import { toast } from "react-toastify"
import Loading from "../../components/loading/Loading"
import PageExplanation from "../../components/pageExplanation/PageExplanation"
import { infoForClassManager } from "../../components/pageExplanation/infoForexplanations/infoForExplanations"
import { v4 as uuidv4 } from 'uuid';


const ClassManager = () => {
  const [updateRequired, setUpdateRequired] = useState(true)
  const [updatedClasses, setUpdatedClasses] = useState([])
  const [classActivities, setClassActivities] = useState([])
  const [classList, setClassList] = useState([])
  const [emptyClassList, setEmptyClassList] = useState([])
  const [dateSelected, setDateSelected] = useState(new Date())
  const [classByDate, setClassByDate] = useState(null)
  const [updateNeeded, setUpdateNeeded] = useState(false)
  const [classesForDay, setClassesForDay] = useState(false)
  const [toUpdate, setToUpdate] = useState(false)
  const [oneUse, setOneUse] = useState(true)
  const [loading, setLoading] = useState(false)
  const [needHelp, setNeedHelp] = useState(false)
  const [showActivites, setShowActivities] = useState("")
  const { userObj } = useAuth()
  const classNameRef = useRef()


  useEffect(() => {
    if (updateRequired === false) {
      return
    }
    if (userObj === null) {
      return
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        const [classGroups, classActivitiesResult, classActivitiesByDateResult] = await Promise.all([
          fetchByUser("classGroup", userObj._id),
          fetchByUser("classActivity", userObj._id),
          fetchByUser("classActivityByDate", userObj._id),
        ]);
        setClassList(classGroups)
        setClassActivities(classActivitiesResult)
        setUpdatedClasses(classActivitiesByDateResult)
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(`Error: We had some difficulty loading data`)
      } finally {
        setLoading(false)
      }
      setClassByDate(updatedClasses)
    }

    fetchData()
    setUpdateRequired(false)
  }, [updateRequired, userObj])


  useEffect(() => {
    if (!classList) {
      return
    }
    if (classList.length > 0 && emptyClassList.length === 0) {
      setEmptyClassList(classList);
    }
  }, [classList]);



  useEffect(() => {
    if (!oneUse && classByDate && classByDate.length > 0) {
      setOneUse(false)
      setClassList(classByDate[0].classes)
    }
  }, [classByDate])


  useEffect(() => {
    if (!classByDate) {
      return
    }

    const classFound = updatedClasses.find(classItem => formatDateForUI(classItem.date) === formatDateForUI(dateSelected))

    if (classFound === undefined || classFound.classes.length === 0) {
      setToUpdate(false)
      setClassList(emptyClassList)
      setClassByDate(emptyClassList)
    } else if (updatedClasses.length > 0) {
      setToUpdate(true)
      setClassByDate(classFound)
      //* This updates the foundClass list if there is a class that has been created after it was created
      if (classFound.classes.length !== emptyClassList.length) {
        const missingClasses = emptyClassList.filter(emptyClass =>
          !classFound.classes.some(foundClass => foundClass._id === emptyClass._id)
        )
        classFound.classes = [...classFound.classes, ...missingClasses];
      }
      setClassList(classFound.classes)
    }

  }, [dateSelected])


  useEffect(() => {
    const checkUpdatedClasses = async () => {
      setLoading(true)
      try {
        await Promise.all(
          updatedClasses.map(async (classItem) => {
            if (classItem.classes.length === 0) {
              await deleteByIdinDB("classActivityByDate", classItem._id);
            }
          })
        );
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error(`Error: Could not update the class groups correctly`)
      } finally {
        setLoading(false)
      }


      if (classesForDay) {
        setLoading(true)
        try {
          const result = await fetchAll("classActivityByDate");

          if (result.error) {
            throw new Error(result.error);
          } else {
            setUpdatedClasses(result)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error(`Error: Could not update the class groups correctly`)
        } finally {
          setLoading(false)
        }

        setClassByDate(classesForDay);
      }
    };

    checkUpdatedClasses();
  }, [classesForDay])

  useEffect(() => {
    if (classNameRef.current) {
      classNameRef.current.focus();
    }
  }, [classNameRef])


  const addActivityToClass = (exercise) => {
    const classSelected = classList.some(classItem => classItem.selected === true)

    let activity = {
      activityId: exercise._id,
      title: exercise.title
    }

    if (classSelected) {
      setClassList(prev => prev.map(classItem => {
        if (classItem.selected === true) {
          return { ...classItem, activityObj: activity }
        } else {
          return classItem
        }
      }))
    }
    setClassList(prev => prev.map(classItem => { return { ...classItem, selected: false } }))
    setUpdateNeeded(true)
  }


  const saveClassesUpdated = async () => {
    setUpdateNeeded(false)

    if (toUpdate) {
      let classesUpdate = {
        classes: classList,
        date: dateSelected.toISOString(),
        createdBy: userObj._id
      }

      let classByDateId = classByDate._id
      setLoading(true)
      try {
        const result = await updateById("classActivityByDate", classByDateId, classesUpdate)

        if (result.error) {
          throw new Error(result.error);
        } else {
          setClassesForDay(result.classes)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(`Error: Could not update the class groups correctly`)
      } finally {
        setLoading(false)
      }
    } else {
      setToUpdate(true)
      let classesUpdated = {
        classes: classList,
        date: dateSelected,
        createdBy: userObj._id
      }

      setLoading(true)
      try {
        const result = await saveActivityToClassGroup(classesUpdated)

        if (result.error) {
          throw new Error(result.error);
        } else {
          setClassByDate(result)
          setClassesForDay(result.classes)
        }
      } catch (error) {
        console.error('Error saving data:', error);
        toast.error(`Error: Could not activity to the class groups correctly`)
      } finally {
        setLoading(false)
      }
    }

  }

  const formatDateForUI = (dateString) => {
    let formattedDate = formatDate(dateString)
    return formattedDate
  }


  const createNewClass = async () => {
    if (classNameRef.current.value !== "") {
      let classGroup = {
        activityObj: null,
        id: uuidv4(),
        name: classNameRef.current.value,
        selected: false,
        createdBy: userObj._id
      }

      setClassList(prev => {
        return [...prev, classGroup]
      })

      setLoading(true)
      try {
        const result = await saveNewClassGroup(classGroup)

        if (result.error) {
          throw new Error(result.error);
        } else {
          setUpdateRequired(true)
        }
      } catch (error) {
        console.error('Error saving new class group:', error);
        toast.error(`Error: Failed to save new class group`)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section className="classManagerSection">
      <Loading
        loading={loading}
      />
      <h1 className="H1ClassManager">Class Manager</h1>
      <div className="mainContentClassManager">
        <div className="calendarAndCreateClassInputDiv">
          <h1 className="classDetailsTitle">CLASS DETAILS</h1>
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

        {classList && (
          <div className="createSelectClassDiv">
            <CreateSelectClass
              classList={classList}
              setClassList={setClassList}
              setUpdateClass={setUpdateNeeded}
              setUpdateRequired={setUpdateRequired}
              dateSelected={dateSelected}
            />
          </div>
        )}

        {!showActivites && (
          <ShowActivities
            classActivities={classActivities}
            formatDateForUI={formatDateForUI}
            setShowActivities={setShowActivities}
            addActivityToClass={addActivityToClass}
          />
        )}

        {showActivites && (
          <div className="showActivitiesClassManager">
            <StudentsPage
              activityCreatedId={showActivites}
            />
            <button className="backButtonClassManager" onClick={() => setShowActivities(null)}>Back</button>
          </div>
        )}

        {needHelp === true && (
          <PageExplanation
            setNeedHelp={setNeedHelp}
            info={infoForClassManager}
          />
        )}

        <button
          onClick={() => setNeedHelp(true)}
          className="howToButtonClassManager howToButton"
        >How do I do this?</button>
      </div>
    </section >


  )
}

export default ClassManager
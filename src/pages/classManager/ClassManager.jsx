import { useEffect, useReducer, useState } from "react"
import "./ClassManager.css"
import StudentsPage from "../studentsPage/StudentsPage"
import { useAuth } from "../../context/AuthContext"
import CreateSelectClass from "../../components/createSelectClass/CreateSelectClass"
import ShowActivities from "../../components/showActivities/ShowActivities"
import Loading from "../../components/loading/Loading"
import PageExplanation from "../../components/pageExplanation/PageExplanation"
import { infoForClassManager } from "../../components/pageExplanation/infoForexplanations/infoForExplanations"
import ClassManagerSideBar from "../../components/classManagerSidebar/ClassManagerSideBar"
import { classManagerReducer, INITIAL_CLASS_MANAGER } from "../../reducers/classManagerReducer";
import { manageSavedClasses } from './../../functions/classManagerFunctions/manageSavedClasses';
import { checkUpdatedClasses } from './../../functions/classManagerFunctions/checkUpdatedClasses';
import { setInitialData } from './../../functions/classManagerFunctions/setInitialData';

const ClassManager = () => {
  const { userObj } = useAuth()
  const [stateClassManager, dispatchClassManager] = useReducer(classManagerReducer, INITIAL_CLASS_MANAGER)
  const { classList, dateSelected, classActivities, updatedClasses, emptyClassesList, classesForDay, activityToShow } = stateClassManager
  const [loading, setLoading] = useState(false)
  const [needHelp, setNeedHelp] = useState(false)

  useEffect(() => {
    if (userObj !== null) {
      setInitialData(dispatchClassManager, setLoading, userObj, stateClassManager.updatedClasses)
    }
  }, [userObj])

  useEffect(() => {
    manageSavedClasses(updatedClasses, dispatchClassManager, dateSelected, emptyClassesList)
  }, [dateSelected, emptyClassesList])

  useEffect(() => {
    checkUpdatedClasses(setLoading, dispatchClassManager, updatedClasses, classesForDay)
  }, [classesForDay])


  return (
    <section className="classManagerSection">
      <Loading
        loading={loading}
      />
      <h1 className="H1ClassManager">Class Manager</h1>
      <div className="mainContentClassManager">

        <ClassManagerSideBar
          dispatch={dispatchClassManager}
          state={stateClassManager}
          setLoading={setLoading}
          userObj={userObj}
        />

        {classList && (
          <div className="createSelectClassDiv">
            <CreateSelectClass
              dispatch={dispatchClassManager}
              state={stateClassManager}
              classList={stateClassManager.classList}
            />
          </div>
        )}

        {!activityToShow && (
          <ShowActivities
            classActivities={classActivities}
            dispatch={dispatchClassManager}
            classList={classList}
          />
        )}

        {activityToShow && (
          <div className="showActivitiesClassManager">
            <StudentsPage
              activityCreatedId={activityToShow._id}
            />
            <button className="backButtonClassManager primaryGreenButton" onClick={() => dispatchClassManager({ type: 'SET_ACTIVITIES_TO_SHOW', payload: null })}>Back</button>
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
        ></button>

      </div>
    </section >


  )
}

export default ClassManager
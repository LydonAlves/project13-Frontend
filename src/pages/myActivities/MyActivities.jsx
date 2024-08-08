import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import "./MyActivities.css"
import YouTube from 'react-youtube'
import { DateContext } from '../../context/DateContext'
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/loading/Loading';
import { UPDATE_ACTIVITIES_CHOSEN, assignActivityToClass } from '../../reducers/activitiesChosenReducer';
import { INITIAL_MY_ACTIVITIES_PAGE, myActivitiesReducer } from '../../reducers/myActivitiesReducer';
import StudentsPage from '../studentsPage/StudentsPage'
import ActivityCardClassManager from './../../components/activityCardClassManager/ActivityCardClassManager';
import ActivityTypeIndicator from './../../components/activityTypeIndicator/ActivityTypeIndicator';
import NextButtons from './../../components/nextButtons/NextButtons';
import { chooseExerciseTypeButtons } from '../../functions/myActivitiesFunctions/chooseExerciseTypeButtons';
import QuestionList from './../../components/questionList/QuestionList';
import CreateQuestionSidebar from '../../components/createQuestionSidebar/CreateQuestionSidebar';
import AddTitleSideBar from './../../components/addTitleSideBar/AddTitleSideBar';
import { loadExercises } from '../../functions/myActivitiesFunctions/loadExercises';
import { saveActivity } from '../../functions/myActivitiesFunctions/saveActivityFunction';
import ActivitySearchBar from './../../components/activitySearchBar/ActivitySearchBar';
import GapText from '../../components/gapText/GapText';


const MyActivities = () => {
  const { userObj } = useAuth()
  const currentDate = useContext(DateContext)

  const [assignedActivities, dispatchActivities] = useReducer(assignActivityToClass, UPDATE_ACTIVITIES_CHOSEN)
  const { video, gapFill } = assignedActivities.activities

  const [stateActivitiesPage, dispatchActivitiesPage] = useReducer(myActivitiesReducer, INITIAL_MY_ACTIVITIES_PAGE)
  const { savedActivity, showSelectedTask, currentStep, title, youTubeExercises, gapFillExercises, questionList } = stateActivitiesPage
  const exerciseButtons = chooseExerciseTypeButtons(title)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userObj) {
      loadExercises(userObj, setLoading, dispatchActivitiesPage);
    }
  }, [userObj])

  useEffect(() => {
    const typeSelected =
      currentStep === 1 ? gapFillExercises :
        currentStep === 2 ? youTubeExercises :
          []

    dispatchActivitiesPage({ type: 'SET_ACTIVITY_TYPE', payload: typeSelected })
  }, [currentStep])

  const handleSaveActivity = () => {
    const { activities } = assignedActivities
    saveActivity(
      activities,
      currentDate,
      stateActivitiesPage,
      dispatchActivitiesPage,
      setLoading,
      userObj
    )
  }

  const resetPageValues = () => {
    dispatchActivities({ type: 'RESET_ACTIVITIES_CHOSEN' })
    dispatchActivitiesPage({ type: 'RESET_MY_ACTIVITIES' })
  }

  return (
    <>
      <Loading
        loading={loading}
        setLoading={setLoading}
      />

      {/* {!showSubmittedActivities && ( */}
      {savedActivity === null && (
        <section className='myClassesSection'>
          <div className='sideBarMyActivities'>
            <div className='activityTypeDiv'>
              <ActivityTypeIndicator
                activityButtonArray={exerciseButtons}
                currentStep={currentStep}
              />
              {(gapFill !== "" || video !== "" || questionList.length > 0) && (
                <button
                  onClick={() => handleSaveActivity()}
                  className='submitActivityButton'
                >Save activity</button>

              )}
            </div>

            <div className='activitiesShownSidebar'>
              {currentStep === 0 && (
                <AddTitleSideBar
                  title={stateActivitiesPage.title}
                  dispatch={dispatchActivitiesPage}
                  type={'SET_TITLE'}
                />
              )}

              {(currentStep === 1 || currentStep === 2) && (
                <div className='activitySearchBarMyAct'>
                  <ActivitySearchBar
                    dispatch={dispatchActivities}
                    dispatchActivitiesPage={dispatchActivitiesPage}
                    activityType={stateActivitiesPage.activityType}
                    currentStep={stateActivitiesPage.currentStep}
                  />
                </div>
              )}

              {/* question*/}
              {currentStep === 3 && (
                <CreateQuestionSidebar
                  dispatch={dispatchActivitiesPage}
                  questionList={stateActivitiesPage.questionList}
                  type={'ADD_QUESTION_TO_LIST'}
                />
              )}

              {title && (
                <div className='nextButtonsMyActivities'>
                  <NextButtons
                    activityButtonArray={exerciseButtons}
                    dispatch={dispatchActivitiesPage}
                    currentStep={currentStep}
                    type={'SET_CURRENT_STEP'}
                  />
                </div>
              )}
            </div>
          </div>

          <div className='activitiesSidebarAndChosenActivities'>

            {/* Add exercises */}
            <div className='activitiesChosenDiv'>

              {title === null && (
                <div className='myActivitiesInfo'>
                  <p className='noActivityMyActivities'>Start by adding a title for your activity</p>
                  <p className='noActivityMyActivities'>Then click next and continue by adding the different types of activities</p>
                </div>
              )}

              {/* Activities selected and shown in the container */}
              {title !== null && (
                <div className='selectedActivitiesDiv'>
                  <p className='activityTitle'> Activity title:  <span className='tiltedTitle'>{title}</span></p>

                  <div className='allChosenActivitiesContainer'>
                    <div className='gapfillAndVideoChosenDiv'>

                      <div className='activitiesExampleDiv'>
                        {video !== "" && (
                          <ActivityCardClassManager
                            dispatch={dispatchActivities}
                            dispatchActivitiesPage={dispatchActivitiesPage}
                            activityName={"video"}
                            activityTypeTitle={"GAP FILL WITH VIDEO EXERCISE"}
                            activityTitle={video.textObj.title}
                            activitySelected={video}
                          />
                        )}

                        {gapFill !== "" && (
                          <ActivityCardClassManager
                            dispatch={dispatchActivities}
                            dispatchActivitiesPage={dispatchActivitiesPage}
                            activityName={"gapFill"}
                            activityTypeTitle={"GAP FILL WITH TEXT EXERCISE"}
                            activityTitle={gapFill.textObj.title}
                            activitySelected={gapFill}
                          />
                        )}
                      </div>

                      {questionList.length > 0 && (
                        <QuestionList
                          questionList={stateActivitiesPage.questionList}
                          dispatch={dispatchActivitiesPage}
                          type={'REMOVE_QUESTION_FROM_LIST'}
                        />
                      )}

                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* shows the preview of the activity */}
          {showSelectedTask !== "" && (
            <div className='previewVideoActivity'>
              <button className='removePreviewActivitybutton'
                onClick={() => dispatchActivitiesPage({ type: 'SET_SHOW_SELECTED_TASK', payload: "" })}>Close</button>
              {showSelectedTask && showSelectedTask.video && (
                <YouTube
                  videoId={showSelectedTask.video.opts.videoId}
                  opts={showSelectedTask.video.opts}
                  onReady={(e) => e.target.pauseVideo()}
                />
              )}
              <div className={showSelectedTask.video ? "previewWithVideo" : 'myClassPreviewGapTextDiv'}>
                <GapText
                  textObj={showSelectedTask.textObj}
                />
              </div>
            </div>
          )}
        </section>
      )
      }

      {savedActivity !== null && savedActivity.activitiesID && (
        <>
          <StudentsPage
            activityCreatedId={savedActivity._id}
          />
          <button
            onClick={() => resetPageValues()}
            className='resetMyClassButton greenButtonColorOnly'
          >Back</button>
        </>
      )}

    </>

  )
}

export default MyActivities
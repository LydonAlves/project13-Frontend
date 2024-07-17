import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import "./MyActivities.css"
import ActivitySearchBar from './activitySearchBar/ActivitySearchBar'
import YouTube from 'react-youtube'
import { v4 as uuidv4 } from 'uuid';
import { deleteById } from '../../utils/deleteById'
import { DateContext } from '../../context/DateContext'
import ActivityCardClassManager from './activityCardClassManager/ActivityCardClassManager'
import GapText from '../../components/fillGapForm/gapText/GapText'
import StudentsPage from '../studentsPage/StudentsPage'
import { useAuth } from '../../context/AuthContext';
import { fetchByUser } from '../../utils/fetchByUser'
import useSearch from '../../components/searchBar/useSearch'
import { UPDATE_ACTIVITIES_CHOSEN, assignActivityToClass } from './myActivitiesFunctions/useReducerMyClasses';
import { saveClassActivity } from './myActivitiesFunctions/saveClassActivity';
import Loading from '../../components/loading/Loading';
import { toast } from 'react-toastify';
import ActivityTypeIndicator from '../../components/activityTypeIndicator/ActivityTypeIndicator';
import NextButtons from '../createTextAndVideoActivity/nextButtons/NextButtons';


const MyActivities = () => {
  const [assignedActivities, dispatachActivities] = useReducer(assignActivityToClass, UPDATE_ACTIVITIES_CHOSEN)
  const [showSubmittedActivities, setShowSubmittedActivities] = useState(false)
  const [savedActivity, setSavedActivity] = useState(null)
  const [showSelectedTask, setShowSelectedTask] = useState("")
  const [activityTypeSelected, setActivityTypeSelected] = useState("title")
  const [toggleSubmit, setToggleSubmit] = useState(false)
  const [gapFillExercises, setGapFillExercises] = useState([])
  const [youTubeExercises, setYouTubeExercises] = useState([])
  const [questionList, setQuestionList] = useState([])
  const [question, setquestion] = useState("")
  const [activityType, setActivityType] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [nextButton, setNextButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(null)
  const titleRef = useRef(null)
  const { searchQuery, search, filteredItems } = useSearch(activityType)
  const { activities } = assignedActivities
  const currentDate = useContext(DateContext)
  const { userObj } = useAuth()

  useEffect(() => {
    setSelectedId(0)
    const fetchExercises = async () => {
      let userId = userObj._id
      setLoading(true)
      try {
        const gapFillResult = await fetchByUser("gapfillText", userId,);
        if (gapFillResult.error) {
          throw new Error(gapFillResult.error);
        } else {
          setGapFillExercises(gapFillResult)
        }

        const videoExerciseResult = await fetchByUser("videoExercise", userId);
        if (videoExerciseResult.error) {
          throw new Error(videoExerciseResult.error);
        } else {
          setYouTubeExercises(videoExerciseResult)
        }
      } catch (error) {
        console.error('Error fetching exercises:', error.message);
        toast.error(`Error: Could not load the data for this page`)
      } finally {
        setLoading(false);
      }
    };


    if (userObj) {
      fetchExercises();
    }
  }, [userObj])

  useEffect(() => {
    setActivityType(gapFillExercises)
  }, [gapFillExercises])

  useEffect(() => {
    if (activityTypeSelected === "gapFill") {
      setActivityType(gapFillExercises)
    } else if (activityTypeSelected === "video") {
      setActivityType(youTubeExercises)
    }
    else {
      setActivityType([])
    }
  }, [activityTypeSelected])

  useEffect(() => {
    if (activities.gapFill === "" && activities.video === "" && (questionList.length === 0)) {
      setToggleSubmit(false)
    } else {
      setToggleSubmit(true)
    }
  }, [activities, questionList])


  const addActivityToClasses = (activity) => {
    if (activityTypeSelected === "video") {
      dispatachActivities({
        type: "UPDATE_ACTIVITIES_CHOSEN",
        payload: {
          video: activity
        }
      })
    } else if (activityTypeSelected === "gapFill") {
      dispatachActivities({
        type: "UPDATE_ACTIVITIES_CHOSEN",
        payload: {
          gapFill: activity
        }
      })
    }
  }

  const removeActivity = (value) => {
    if (value === "video") {
      dispatachActivities({
        type: "UPDATE_ACTIVITIES_CHOSEN",
        payload: {
          video: ""
        }
      })
    } else if (value === "gapFill") {
      dispatachActivities({
        type: "UPDATE_ACTIVITIES_CHOSEN",
        payload: {
          gapFill: ""
        }
      })
    }
  }


  const saveQuestion = () => {
    if (questionList.length === 3) {
      toast.error(`You can have a max of three questions`)
      return
    }

    if (question !== "") {
      const questionObj = {
        text: question,
        id: uuidv4()
      }
      setQuestionList(prev => {
        return [...prev, questionObj]
      })
      setquestion("")
    }
  }


  const saveActivity = async () => {
    let activitiesID = {
      gapFill: activities.gapFill._id,
      video: activities.video._id
    }

    let finalActivity = {
      activitiesID,
      date: currentDate,
      id: uuidv4(),
      title: title,
      questions: questionList,
      createdBy: userObj._id
    }

    setLoading(true)
    try {
      const savedActivity = await saveClassActivity(finalActivity)
      if (savedActivity.error) {
        throw new Error(videoExerciseResult.error);
      } else {
        setSavedActivity(savedActivity)
        setShowSubmittedActivities(true)
      }
    } catch (error) {
      console.error('Error saving class activity:', error);
      toast.error(`Error: Could not save the activity`)
    } finally {
      setLoading(false)
    }
  }

  const addTitle = () => {
    if (titleRef.current.value === "") {
      toast.error(`You need to add a title to continue`)
      return
    } else {
      setTitle(titleRef.current.value)
    }

  }

  const resetPageValues = () => {
    setShowSubmittedActivities(false)
    setActivityTypeSelected("title")
    dispatachActivities({
      type: "UPDATE_ACTIVITIES_CHOSEN",
      payload: {
        gapFill: "",
        video: ""
      }
    })
    setShowSelectedTask("")
    setSelectedId(0)
    setQuestionList([])
    setSavedActivity(null)
    setquestion("")
    setTitle(null)
  }

  const chooseExerciseTypeButtons = [
    {
      id: 0,
      name: "Title",
      value: "title",
      isActive: true
    },
    {
      id: 1,
      name: "Fill gap text",
      value: "gapFill",
      isActive: title ? true : false
    },
    {
      id: 2,
      name: "Video",
      value: "video",
      isActive: title ? true : false
    },
    {
      id: 3,
      name: "Questions",
      value: "questions",
      isActive: title ? true : false
    },
  ]


  return (
    <>
      <Loading
        loading={loading}
        setLoading={setLoading}
      />

      {
        !showSubmittedActivities && (
          <section className='myClassesSection'>
            <h1 className="H1myActivities">My Activities</h1>

            <div className='activityTypeDiv'>
              <ActivityTypeIndicator
                activityButtonArray={chooseExerciseTypeButtons}
                selectedId={selectedId}
              />
            </div>
            {toggleSubmit === true && (
              <button className='submitActivityButton'
                onClick={() => saveActivity()}>Save activity</button>
            )}

            <div className='activitiesSidebarAndChosenActivities'>

              {/* Add exercises */}
              <div className='activitiesChosenDiv'>
                <div className='activitiesShownSidebar'>

                  {activityTypeSelected === "title" && (
                    <div className='addtitleDiv'>
                      <p className='sideBarTitleMyClasses'>CREATE A TITLE</p>
                      {title !== null && (
                        <p className='changeTitle'>Change the title below</p>
                      )}
                      <input type="text" ref={titleRef} className='inputSideBarMyClasses' />
                      <button onClick={() => addTitle()}
                        className='sidebarTitleButton'>{title === null ? "ADD TITLE" : "CHANGE TITLE"}</button>
                    </div>
                  )}

                  {/* Activity search bar */}
                  {(activityTypeSelected === "video" || activityTypeSelected === "gapFill") && (
                    <div className='activitySearchBarMyAct'>
                      <ActivitySearchBar
                        searchQuery={searchQuery}
                        search={search}
                        filteredItems={filteredItems}
                        addActivityToClasses={addActivityToClasses}
                        setShowSelectedTask={setShowSelectedTask}
                      />
                    </div>
                  )}

                  {/* question*/}
                  {activityTypeSelected === "questions" && (
                    <div className='addQuestionsMyActivities'>
                      <p className='sideBarTitleMyClasses'>ADD QUESTION HERE</p>
                      <p className='addQuestionText'>Add up to three questions that students will answer orally</p>
                      <textarea
                        value={question}
                        type="text"
                        onChange={(e) => setquestion(e.target.value)}
                        className='textAreaSideBarMyClasses' />
                      <button
                        onClick={() => saveQuestion()}
                        className='activitiesSidebarTitleButton'
                        type='button'
                      >SAVE</button>

                    </div>)}
                  {title && (
                    <div className='nextButtonsMyActivities'>
                      <NextButtons
                        activityButtonArray={chooseExerciseTypeButtons}
                        chooseStepOfProcess={setActivityTypeSelected}
                        nextButton={nextButton}
                        setNextButton={setNextButton}
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                      />
                    </div>
                  )}
                </div>

                {title === null && (
                  <div className='myActivitiesInfo'>
                    <p className='noActivityMyActivities'>Start by adding a title for your activity</p>
                    <p>Then click next and continue by adding the different types of activities</p>
                  </div>
                )}

                {/* Activities selected and shown in the container */}
                {title !== null && (
                  <div className='selectedActivitiesDiv'>
                    <p className='activityTitle'> Activity title:  <span className='tiltedTitle'>{title}</span></p>

                    <div className='allChosenActivitiesContainer'>
                      <div className='gapfillAndVideoChosenDiv'>
                        {assignedActivities.activities.video !== "" && (
                          <ActivityCardClassManager
                            removeActivity={removeActivity}
                            activityName={"video"}
                            activityTypeTitle={"GAP FILL WITH VIDEO EXERCISE"}
                            activityTitle={assignedActivities.activities.video.textObj.title}
                            setShowSelectedTask={setShowSelectedTask}
                            activitySelected={assignedActivities.activities.video}
                          />
                        )}

                        {assignedActivities.activities.gapFill !== "" && (
                          <ActivityCardClassManager
                            removeActivity={removeActivity}
                            activityName={"gapFill"}
                            activityTypeTitle={"GAP FILL WITH TEXT EXERCISE"}
                            activityTitle={assignedActivities.activities.gapFill.textObj.title}
                            setShowSelectedTask={setShowSelectedTask}
                            activitySelected={assignedActivities.activities.gapFill}
                          />
                        )}
                        {questionList.length > 0 && (
                          <div className='questionsDiv'>
                            <p className='questionDivTitle'>Questions</p>
                            {questionList.map((questionObj, index) => (
                              <div key={index} className='individualQuestionDiv'>
                                <p className='questionDivText'>{questionObj.text} </p>
                                <button onClick={() => deleteById(questionObj.id, setQuestionList)}
                                  className='questionDivDeleteButton'>Delete</button>
                              </div>
                            ))}
                          </div>
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
                  onClick={() => setShowSelectedTask("")}>Close</button>
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

      {savedActivity !== null && (
        <>
          <StudentsPage
            activityCreatedId={savedActivity._id}
          />
          <button
            className='resetMyClassButton greenButtonColorOnly'
            onClick={() => resetPageValues()}
          >Back</button>
        </>
      )}

    </>

  )
}

export default MyActivities
import { useEffect, useReducer, useState } from "react"
import "./StudentsPage.css"
import YouTube from "react-youtube";
import { useAuth } from './../../context/AuthContext';
import Loading from "../../components/loading/Loading";
import PageExplanation from "../../components/pageExplanation/PageExplanation";
import { infoForGapfillText, infoForQuestionActivity, infoForYoutubeActivity } from "../../components/pageExplanation/infoForexplanations/infoForExplanations";
import GapFill from "../../components/gapFill/GapFill";
import ActivityButtons from "../../components/activityButtons/ActivityButtons";
import AudioRecorder from "../../components/audioRecorder/AudioRecorder";
import { INITIAL_STUDENT_PAGE, studentPageReducer } from "../../reducers/studentPageReducer";
import { getSavedAnswers } from "../../functions/studentsPageFunctions.js/getSavedAnswers";
import { saveToLocalStorageIfChanged } from "../../functions/studentsPageFunctions.js/saveToLocalStorageIfChanged";
import { setupActivities } from "../../functions/studentsPageFunctions.js/setupActivities";
import { fetchActivities } from "../../functions/studentsPageFunctions.js/manageFetchActivities";

const StudentsPage = ({ activityCreatedId }) => {
  const { userObj } = useAuth()
  const [stateStudentsPage, dispatchStudentsPage] = useReducer(studentPageReducer, INITIAL_STUDENT_PAGE)
  const { allActivities, answersGapFill, answersVideo, activityType } = stateStudentsPage
  const [loading, setLoading] = useState(false)
  const [needHelp, setNeedHelp] = useState(false)

  useEffect(() => {
    getSavedAnswers('answersVideo', [], dispatchStudentsPage, 'SET_ANSWERS_VIDEO');
    getSavedAnswers('answersGapFill', [], dispatchStudentsPage, 'SET_ANSWERS_GAPFILL');
  }, [])

  useEffect(() => {
    if (answersVideo === null && activityType === "youTubeFillGap") {
      dispatchStudentsPage({ type: 'SET_ANSWERS_VIDEO', payload: [] })
    }
    if (answersGapFill === null && activityType === "fillGapText") {
      dispatchStudentsPage({ type: 'SET_ANSWERS_GAPFILL', payload: [] })
    }
  }, [answersVideo, answersGapFill, activityType])

  useEffect(() => {
    saveToLocalStorageIfChanged('answersVideo', answersVideo);
    saveToLocalStorageIfChanged('answersGapFill', answersGapFill);
  }, [answersVideo, answersGapFill]);

  useEffect(() => {
    if (userObj) {
      setLoading(true)
      fetchActivities(activityCreatedId, dispatchStudentsPage, userObj)
      setLoading(false)
    }
  }, [userObj])

  useEffect(() => {
    if (allActivities.length > 0) {
      setupActivities(dispatchStudentsPage, activityCreatedId, allActivities)
    }
  }, [allActivities])

  useEffect(() => {
    const activitiesObj = {
      youTubeFillGap: infoForYoutubeActivity,
      fillGapText: infoForGapfillText,
      questions: infoForQuestionActivity,
    }

    if (activitiesObj[activityType]) {
      dispatchStudentsPage({ type: 'SET_INFO_FOR_EXPLANATION', payload: activitiesObj[activityType] });
    }
  }, [activityType])


  return (
    <section className="studentsPageSection" >
      <Loading
        loading={loading}
      />
      {stateStudentsPage.chosenDate && (
        <>
          <div className="buttonsDateStudentsPage">
            <ActivityButtons
              dispatch={dispatchStudentsPage}
              state={stateStudentsPage}
            />
          </div>

          {activityType === "youTubeFillGap" && (
            <div className="studentsPageYoutubeDiv">
              {stateStudentsPage.videoObj !== "" ? (
                <>
                  <div className="studentsPageYouTube">
                    <YouTube
                      videoId={stateStudentsPage.videoObj.opts.videoId}
                      opts={stateStudentsPage.videoObj.opts}
                      onReady={(e) => e.target.pauseVideo()}
                    />
                  </div>
                  {answersVideo && (
                    <GapFill
                      chosenText={stateStudentsPage.gapFillVideo}
                      inputs={answersVideo}
                    />
                  )}
                </>
              ) : (
                <p className="noActivityNotificationStudentPage">No Video task has been assigned, check the other activity types</p>
              )}
            </div>
          )}

          {activityType === "fillGapText" && (
            <>
              {stateStudentsPage.gapFill !== "" ? (
                <GapFill
                  chosenText={stateStudentsPage.gapFill}
                  inputs={answersGapFill}
                />
              ) : (
                <p className="noActivityNotificationStudentPage">No Gap Fill task has been assigned, check the other activity types</p>
              )}
            </>
          )}

          {activityType === "questions" && (
            <>
              {stateStudentsPage.questions.length > 0 ? (
                <AudioRecorder
                  questions={stateStudentsPage.questions}
                />
              ) : (
                <p>No Question task has been assigned, check the other activity types</p>
              )}
            </>
          )}
        </>
      )
      }

      {!stateStudentsPage.chosenDate && (
        <div className="studentsPageNoContentDiv">
          <p>No Activities have been assigned to your class group</p>
          <p>Make sure that you have joined a class group</p>
        </div>
      )}

      {needHelp === true && (
        <PageExplanation
          setNeedHelp={setNeedHelp}
          info={stateStudentsPage.infoForExplanation}
        />
      )}

      <button
        onClick={() => setNeedHelp(true)}
        className="howToButtonStudentsPage howToButton"
      ></button>

    </section >
  )
}

export default StudentsPage
import { useEffect, useState } from "react"
import "./StudentsPage.css"
import YouTube from "react-youtube";
import { formatDate } from "../../context/DateContext";
import { fetchById } from "../../utils/fetchById";
import { fetchByUser } from './../../utils/fetchByUser';
import { useAuth } from './../../context/AuthContext';
import { fetchByRole } from "../../utils/fetchByRole";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";
import PageExplanation from "../../components/pageExplanation/PageExplanation";
import { infoForGapfillText, infoForQuestionActivity, infoForYoutubeActivity } from "../../components/pageExplanation/infoForexplanations/infoForExplanations";
import GapFill from "../../components/gapFill/GapFill";
import ActivityButtons from "../../components/activityButtons/ActivityButtons";
import { fetchByClassId } from "../../utils/fetchByClassID";
import { findActivityObjById } from "./studentsPageFunctions.js/findActivityObjById";
import { findMostRecentActivity } from "./studentsPageFunctions.js/findMostRecentActivity";
import AudioRecorder from "./speakingPractice/AudioRecorder";

const StudentsPage = ({ activityCreatedId }) => {
  const [allActivities, setAllActivities] = useState([])
  const [videoObj, setVideoObj] = useState("")
  const [videoOpts, setVideoOpts] = useState("")
  const [gapFill, setGapFill] = useState("")
  const [questions, setQuestions] = useState("")
  const [chosenDate, setChosenDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [needHelp, setNeedHelp] = useState(false)
  const [infoForExplanation, setInfoForExplanation] = useState([])
  const [activityType, setActivityType] = useState("youTubeFillGap")
  const { userObj } = useAuth()

  const [answersVideo, setAnswersVideo] = useState(() => {
    const savedAnswersVideo = localStorage.getItem('answersVideo');
    return savedAnswersVideo === null || savedAnswersVideo === "undefined" ? [] : JSON.parse(savedAnswersVideo);
  });

  const [answersGapFill, setAnswersGapFill] = useState(() => {
    const savedAnswersGapFill = localStorage.getItem('answersGapFill');
    return savedAnswersGapFill !== "undefined" ? JSON.parse(savedAnswersGapFill) : [];
  });

  useEffect(() => {
    if (answersVideo === null && activityType === "youTubeFillGap") {
      setAnswersVideo([])
    }

    if (answersGapFill === null && activityType === "fillGapText") {
      setAnswersGapFill([])
    }
  }, [answersVideo, answersGapFill, activityType])

  useEffect(() => {
    localStorage.setItem('answersVideo', JSON.stringify(answersVideo));
  }, [answersVideo]);

  useEffect(() => {
    localStorage.setItem('answersGapFill', JSON.stringify(answersGapFill));
  }, [answersGapFill]);


  useEffect(() => {
    const fetchActivities = async () => {
      if (userObj) {
        if (activityCreatedId && typeof activityCreatedId === 'object' && activityCreatedId !== null) {
          setAllActivities([activityCreatedId]);
        } else if (activityCreatedId) {
          setLoading(true)
          try {
            const result = await fetchById("classActivity", activityCreatedId);
            if (result.error) {
              throw new Error(result.error);
            } else {
              console.log("fetched activity", result);
              setAllActivities(result)
            }
          } catch (error) {
            console.error('Error fetching the class activity:', error);
            toast.error(`Error: We had some difficulty loading data`)
          } finally {
            setLoading(false)
          }
        } else if (userObj.role === "student") {
          setLoading(true)
          try {
            const result = await fetchByClassId("classActivityByDate", userObj.classGroup);
            if (result.error) {
              throw new Error(result.error);
            } else {
              const activityObj = findMostRecentActivity(result)
              let classActivitiesFound = findActivityObjById(activityObj, userObj.classGroup)
              try {
                const result = await fetchById("classActivity", classActivitiesFound[0].activityId);
                if (result.error) {
                  throw new Error(result.error);
                } else {
                  setAllActivities(prevActivities => [...prevActivities, result])
                }
              } catch (error) {
                console.error('Error fetching the class activity:', error);
                toast.error(`Error: We had some difficulty loading data`)
              } finally {
                setLoading(false)
              }
            }
          } catch (error) {
            console.error('Error fetching the class activity:', error);
            toast.error(`Error: We had some difficulty loading data`)
          } finally {
            setLoading(false)
          }
        } else {
          setLoading(true)
          try {
            const result = await fetchByUser("classActivity", userObj._id);
            if (result.error) {
              throw new Error(result.error);
            } else {
              setAllActivities(result)
            }
          } catch (error) {
            console.error('Error  fetching the class activity:', error);
            toast.error(`Error: We had some difficulty loading data`)
          } finally {
            setLoading(false)
          }
        }
      } else {
        setLoading(true)
        try {
          const result = await fetchByRole("classActivity", "admin")

          if (result.error) {
            throw new Error(result.error);
          } else {
            setAllActivities(result)
          }
        } catch (error) {
          console.error('Error saving fetching the class activity:', error);
          toast.error(`Error: We had some difficulty loading data`)
        } finally {
          setLoading(false)
        }
      }
    };

    fetchActivities();
  }, [userObj])


  useEffect(() => {
    const now = new Date()
    if (allActivities.length === 0) {
      return
    }

    let mostRecentActivity

    if (activityCreatedId) {
      mostRecentActivity = allActivities
    } else {
      mostRecentActivity = allActivities.reduce((latest, item) => {
        const itemDate = new Date(item.date)
        const latestDate = new Date(latest.date)

        if (itemDate <= now) {
          return itemDate > latestDate ? item : latest
        }

        return latest
      })
    }


    if (mostRecentActivity.activitiesID.video) {
      let currentVideo = mostRecentActivity.activitiesID.video

      const opts = {
        borderRadius: currentVideo.video.opts.borderRadius,
        height: '200',
        width: '320',
        playerVars: currentVideo.video.opts.playerVars
      };
      setVideoOpts(opts)
    }

    if (mostRecentActivity?.activitiesID?.video) {
      setVideoObj(mostRecentActivity.activitiesID.video);
    }

    if (mostRecentActivity?.activitiesID?.gapFill) {
      setGapFill(mostRecentActivity.activitiesID.gapFill);
    }

    if (mostRecentActivity?.questions) {
      setQuestions(mostRecentActivity.questions);
    }

    let chosenDate = formatDate(mostRecentActivity.date)
    setChosenDate(chosenDate)
  }, [allActivities])

  useEffect(() => {
    if (activityType === "youTubeFillGap") {
      setInfoForExplanation(infoForYoutubeActivity)
    } else if (activityType === "fillGapText") {
      setInfoForExplanation(infoForGapfillText)
    } else if (activityType === "questions") {
      setInfoForExplanation(infoForQuestionActivity)
    }
  }, [activityType])

  const chooseActivityButtons = [
    {
      id: 1,
      name: "Video",
      value: "youTubeFillGap"
    },
    {
      id: 2,
      name: "Fill gap text",
      value: "fillGapText"
    },
    {
      id: 3,
      name: "Questions",
      value: "questions",
    },
  ]

  return (
    <section className="studentsPageSection" >
      <Loading
        loading={loading}
      />
      {chosenDate && (
        <>
          <div className="buttonsDateStudentsPage">
            <ActivityButtons
              buttonArray={chooseActivityButtons}
              setActivityType={setActivityType}
              activityType={activityType}
            />
          </div>

          {activityType === "youTubeFillGap" && (
            <div className="studentsPageYoutubeDiv">
              {videoObj !== "" ? (
                <>
                  <div className="studentsPageYouTube">
                    <YouTube
                      videoId={videoObj.video.opts.videoId}
                      opts={videoOpts}
                      onReady={(e) => e.target.pauseVideo()}
                    />
                  </div>
                  {answersVideo && (
                    <GapFill
                      chosenText={videoObj}
                      inputs={answersVideo}
                      setInputs={setAnswersVideo}
                    />
                  )}
                </>
              ) : (
                <p className="noActivityNotificationStudentPage">No Video task has been assigned, check the other activity types</p>
              )}
            </div>
          )}

          {
            activityType === "fillGapText" && (
              <>
                {gapFill !== "" ? (
                  <GapFill
                    chosenText={gapFill}
                    inputs={answersGapFill}
                    setInputs={setAnswersGapFill}
                  />
                ) : (
                  <p className="noActivityNotificationStudentPage">No Gap Fill task has been assigned, check the other activity types</p>
                )}
              </>
            )
          }

          {activityType === "questions" && (
            <>
              {questions.length > 0 ? (
                <AudioRecorder
                  questions={questions}
                />
              ) : (
                <p>No Question task has been assigned, check the other activity types</p>
              )}
            </>
          )
          }
        </>
      )}

      {!chosenDate && (
        <div className="studentsPageNoContentDiv">
          <p>No Activities have been assigned to your class group</p>
          <p>Make sure that you have joined a class group</p>
        </div>
      )}

      {needHelp === true && (
        <PageExplanation
          setNeedHelp={setNeedHelp}
          info={infoForExplanation}
        />
      )}

      <button
        onClick={() => setNeedHelp(true)}
        className="howToButtonStudentsPage howToButton"
      >How do I do this?</button>


    </section >
  )
}

export default StudentsPage
import { useContext, useEffect, useReducer, useState } from "react"
import "./CreateTextAndVideoExercise.css"
import { exerciseReducer, INITIAL_EXERCISE_STATE } from "../../reducers/createExerciseReducer";
import { finalExerciseReducer, INITIAL_FINAL_EXERCISE_STATE } from "../../reducers/finalExerciseReducer";
import YouTube from "react-youtube";
import { useAuth } from '../../context/AuthContext';
import TextInputsToBeSet from './../../components/textInputsToBeSet/TextInputsToBeSet';
import AddTextForm from './../../components/addTextForm/AddTextForm';
import CreateGapFillExplanation from "../../components/createGapFillExplanation/CreateGapFillExplanation";
import Loading from "../../components/loading/Loading";
import NextButtons from "../../components/nextButtons/NextButtons";
import SavedFinalExAnswers from "../../components/savedFinalExAnswers/SavedFinalExAnswers";
import ActivityTypeIndicator from './../../components/activityTypeIndicator/ActivityTypeIndicator';
import { chooseExerciseButtons } from "../../functions/createActivityFunctions/chooseExerciseButtons";
import ChooseExercise from "../../components/chooseExercise/ChooseExercise";
import { createExerciseInfo } from "../../functions/createActivityFunctions/createExerciseInfo";
import { fetchRules } from "../../functions/createRuleFunctions/fetchRules";
import { submitExerciseCreated } from './../../functions/createActivityFunctions/submitExerciseCreated';
import { DateContext } from "../../context/DateContext";
import RulesSearchAndCreate from './../../components/rulesSearchAndCreate/RulesSearchAndCreate';
import GapText from "../../components/gapText/GapText";
import CreateYoutubeActivity from "../../components/createYouTubeActivity/CreateYoutubeActivity";
import OpenAiCreateTextExercise from "../../components/openAiCreateTextExercise/OpenAiCreateTextExercise";
import { checkScreenSize } from "../../functions/videoFunctions/checkScreenSize";

const CreateTextAndVideoExercise = () => {
  const { userObj } = useAuth()
  const date = useContext(DateContext)
  const [stateExercise, dispatchExercise] = useReducer(exerciseReducer, INITIAL_EXERCISE_STATE)
  const { savedFinalExercise, currentStep, exerciseType, videoData } = stateExercise
  const videoId = videoData !== "" ? videoData.opts.videoId : ""

  const [stateFinalExercise, dispatchFinalExercise] = useReducer(finalExerciseReducer, INITIAL_FINAL_EXERCISE_STATE)
  const finalText = stateExercise ? stateFinalExercise.textObj : ""

  const activityButtonArray = chooseExerciseButtons(finalText, exerciseType)
  const [videoScreenSize, setVideoScreenSize] = useState("")
  const [loading, setLoading] = useState(false)
  const [needHelp, setNeedHelp] = useState(false)

  useEffect(() => {
    fetchRules(dispatchExercise, setLoading)
  }, [])

  useEffect(() => {
    if (videoData !== "") {
      checkScreenSize(videoData, setVideoScreenSize)
    }
  }, [videoData]);


  const handleSubmit = () => {
    submitExerciseCreated(userObj, date, dispatchExercise, stateExercise, stateFinalExercise, setLoading)
  }

  const resetCreateActivity = () => {
    setNeedHelp(false)
    dispatchExercise({ type: 'RESET_CREATE_EXERCISE_STATE' })
    dispatchFinalExercise({ type: 'RESET_FINAL_EXERCISE_STATE' })
  }


  return (
    <section className="createTextSection">
      <Loading
        loading={loading}
      />

      {exerciseType === "" && (
        <div className="welcomeCreateActivity">
          <h1 className="createExerciseH1">Create an Exercise</h1>
          <ChooseExercise
            createExerciseInfo={createExerciseInfo}
            dispatchExercise={dispatchExercise}
          />
        </div>
      )}

      {/* Titles */}
      {exerciseType !== "" && exerciseType !== "AIfillGapText" && (
        exerciseType === "fillGapText" ?
          <h1 className="createExerciseH1">Text Exercise</h1> :
          <h1 className={`createExerciseH1 H1youtubeTitleCreate`}>Video Exercise</h1>
      )}

      {exerciseType !== 'AIfillGapText' && exerciseType !== "" && currentStep !== 3 && (
        <div className="createActivityButtonsDiv">
          <ActivityTypeIndicator
            activityButtonArray={activityButtonArray}
            currentStep={currentStep}
          />
        </div>
      )}

      {currentStep === 4 && (
        <OpenAiCreateTextExercise
          resetCreateActivity={resetCreateActivity}
        />
      )}

      {exerciseType !== "" && currentStep !== 4 && (
        <div className="mainContentDivCreateExercise">
          {currentStep === 1 && (
            <AddTextForm
              dispatchExercise={dispatchExercise}
              stateFinalExercise={stateFinalExercise}
              dispatchFinalExercise={dispatchFinalExercise}
            />
          )}

          {currentStep === 2 && (
            <div className="gapsAndRulesContainer">

              {stateExercise.initialInputs.length > 0 ?
                <div className="gapAndRulesDiv">
                  <div className="gapTextExerciseDiv">
                    <GapText
                      textObj={finalText}
                    />
                  </div>
                  <div className="textInputDiv">
                    <TextInputsToBeSet
                      stateExercise={stateExercise}
                      dispatchExercise={dispatchExercise}
                    />
                  </div>
                </div>
                :
                <div className="gapAndRulesEmptyDiv">
                  <p>Go back to <strong>Fill Gap Text</strong> to add a text and title</p>
                </div>
              }

              {currentStep === 2 && (
                <RulesSearchAndCreate
                  stateExercise={stateExercise}
                  dispatchExercise={dispatchExercise}
                  setLoading={setLoading}
                />
              )}
            </div>
          )}

          {currentStep === 0 && (
            <div className="createVideoAndGapFillDiv">
              <div className="videoAndSettingsDiv">
                {(currentStep === 0 || (currentStep === 3 && exerciseType === "youTubeFillGap")) && (
                  <YouTube
                    videoId={videoId}
                    opts={videoScreenSize.opts}
                    onReady={(e) => e.target.pauseVideo()}
                  />
                )}
                <CreateYoutubeActivity
                  dispatch={dispatchExercise}
                />
              </div>
            </div>
          )}


          {currentStep === 3 && (
            <div className="savedFinalExerciseDiv">
              {videoData && videoData.opts.videoId !== "" && (
                <div className="youtubeFinishedTask">
                  <YouTube
                    videoId={videoData.opts.videoId}
                    opts={videoData.opts}
                    onReady={(e) => e.target.pauseVideo()}
                  />
                </div>
              )}
              <div className="GapFillSavedFinalTextDiv">
                <GapText
                  textObj={finalText}
                />
              </div>
              {savedFinalExercise !== "" && (
                <SavedFinalExAnswers
                  savedFinalExercise={savedFinalExercise}
                />
              )}
            </div>
          )}
        </div>
      )}

      {exerciseType !== "AIfillGapText" && exerciseType !== "" && currentStep !== 3 && (
        <div className="nextButtonsDiv">
          <NextButtons
            activityButtonArray={activityButtonArray}
            dispatch={dispatchExercise}
            currentStep={currentStep}
            type={'SET_CURRENT_STEP'}
          />

          {currentStep === 2 && (
            <button className="navButtonsCreateExercise" onClick={() => handleSubmit()}>Submit Exercise</button>
          )}
        </div>
      )}

      <CreateGapFillExplanation
        currentStep={currentStep}
        setNeedHelp={setNeedHelp}
        needHelp={needHelp}
      />

      <button
        onClick={() => setNeedHelp(true)}
        className="howToButton howToButtonCreateEx">
      </button>

      {exerciseType !== "AIfillGapText" && (
        <button
          onClick={() => resetCreateActivity()}
          className="createNewActivityButtonx"
        >Create Exercise</button>
      )}

    </section >
  )
}

export default CreateTextAndVideoExercise



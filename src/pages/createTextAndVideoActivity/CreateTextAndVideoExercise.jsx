import { useEffect, useState } from "react"
import "./CreateTextAndVideoExercise.css"
import useToggle from "../../hooks/useToggle";
import { updateInputs } from '../../components/textActivityComponents/updateInputs';
import useCreateTextSegments from "../../hooks/useCreateTextSegmensts";
import useCreateFillGapTextInputs from "../../hooks/useCreateFillGapTextInputs";
import useSetGapExerciseInputValues from "../../hooks/useSetGapExerciseInputValues";
import useCreateNewRule from "../../hooks/useCreateNewRule";
import CreateRuleForm from "../../components/createRuleForm/CreateRuleForm";
import RuleSearchBar from "../../components/searchBar/RuleSearchBar";
import TextInputsToBeSet from "../../components/textInputsToBeSet/TextInputsToBeSet";
import AddTextForm from "../../components/addTextForm/AddTextForm";
import useActivitySetupProcess from "../../hooks/useActivitySetupProcess";
import YouTube from "react-youtube";
//import { fetchAll } from "../../utils/fetchAll";
import OpenAiCreateTextActivity from './openAiCreateTextExercise/OpenAiCreateTextExercise';
import CreateGapFillExplanation from "./createGapFillExplanation/CreateGapFillExplanation";
import GapText from "../../components/fillGapForm/gapText/GapText";
import { useAuth } from '../../context/AuthContext';
import useSearch from "../../components/searchBar/useSearch";
import { saveCompleteExercise } from "./functionsCreateActivity/saveCompleteExercise";
import { assignRuleToGap } from "../../components/createRuleForm/createRuleFunctions/updateRuleForGap";
import Loading from "../../components/loading/Loading";
import NextButtons from "./nextButtons/NextButtons";
import CreateYoutubeActivity from "../../components/videoListening/CreateYoutubeActivity";
import SavedFinalExAnswers from "./savedFinalExAnswers/SavedFinalExAnswers";
import ActivityTypeIndicator from "../../components/activityTypeIndicator/ActivityTypeIndicator";
import { toast } from 'react-toastify';
import { videoScreenSize } from "../../utils/videoUtils/adjustScreenSize";
import ChooseExercise from "./chooseExercise/ChooseExercise";
import { fetchFunction } from "../../utils/fetchAll";

const CreateTextAndVideoExercise = () => {
  const [savedFinalExercise, setSavedFinalExercise] = useState("")
  const [seeSearchBar, setSeeSearchBar] = useToggle()
  const [updateRules, setUpdateRules] = useToggle()
  const [needHelp, setNeedHelp] = useState(false)
  const [activityText, setActivityText] = useState("")
  const [finalText, setFinalText] = useState({ text: "", title: "" })
  const [textTitle, setTextTitle] = useState("")
  const [videoData, setVideoData] = useState("")
  const [ruleList, setRuleList] = useState([])
  const [videoObj, setVideoObj] = useState("")
  const { activitySetupStage, updateProcess, activityType, chooseStepOfProcess, resetActivityType } = useActivitySetupProcess()
  const { createSegmentsFromText, initialInputs } = useCreateTextSegments()
  const { inputsToFill, updateInputToFill, createInitialInputObj } = useCreateFillGapTextInputs()
  const { gapIndex, updateGapIndex, createNewExercise } = useSetGapExerciseInputValues()
  const { grammarTitleRef, grammarExplanationRef, createRule } = useCreateNewRule()
  const { searchQuery, search, filteredItems } = useSearch(ruleList)
  const { userObj } = useAuth()
  const [nextButton, setNextButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  console.log(activityType);

  const handleScreenChange = (e) => {
    videoScreenSize(setVideoData, e)
  };

  useEffect(() => {
    if (videoData === "") {
      return
    }
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    mediaQuery.addEventListener('change', handleScreenChange);
    if (mediaQuery.matches && videoData.opts.width === "500px") {
      handleScreenChange(mediaQuery);
    } else if (!mediaQuery.matches && videoData.opts.width === "250px") {
      handleScreenChange(mediaQuery);
    }
    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, [videoData]);

  useEffect(() => {
    const fetchRules = async () => {
      setLoading(true)
      try {
        // const result = await fetchAll("rules")
        const result = await fetchFunction("rules")

        if (result.error) {
          throw new Error(result.error);
        } else {
          setRuleList(result)
        }
      } catch (error) {
        console.error('Error loading rules:', error);
        toast.error(`Error: We had some difficulty loading data`)
      } finally {
        setLoading(false)
      }
    }
    fetchRules()

  }, [updateRules])

  useEffect(() => {
    if (finalText.text === undefined) {
      return
    }
    createInitialInputObj(initialInputs)
  }, [finalText])

  const submitTextForm = (e) => {
    e.preventDefault()
    if (textTitle !== "" && activityText !== "") {
      let gapTex = {
        title: textTitle,
        text: activityText
      }
      chooseStepOfProcess("gapAndRules")
      createSegmentsFromText(activityText)
      setFinalText(gapTex)
      setSelectedId(3)
    } else {
      toast.error(`You need to add a title and text before you can submit`)
    }
  }

  const handleInputsSubmitted = (index, value) => {
    const updatedInputs = updateInputs(inputsToFill, index, value)
    updateInputToFill(updatedInputs)
  }

  const videoNextButton = (value) => {
    updateProcess(value)
    setNextButton(true)
  }

  const submitRuleForm = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const result = await createRule()
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error saving saving the rule:', error);
      toast.error(`Error: Could not save the rule`)
    } finally {
      setLoading(false)
    }

    setUpdateRules()
    setSeeSearchBar()
    grammarTitleRef.current.value = ""
    grammarExplanationRef.current.value = ""
  }

  const addRuleToGap = (id) => {
    if (id !== gapIndex) {
      updateGapIndex(id)
    } else {
      updateGapIndex("")
    }
  }

  const updateRuleInGap = (item) => {
    assignRuleToGap(item, gapIndex, updateInputToFill)
    updateGapIndex("")
  }

  const submitExercise = async () => {
    if (finalText.text === "" || finalText.title === "") {
      toast.error(`Error: You have to add a text and title before continuing`);
      return
    }
    if (inputsToFill.some(answer => !answer.rule)) {
      toast.error(`Error: You have to add a rule to each gap before continuing`);
      return
    }

    const userId = userObj._id
    const exercise = createNewExercise(finalText, inputsToFill, userId, videoObj)
    const endpoint = videoData !== "" ? 'videoExercise' : 'gapfillText';

    setLoading(true)
    try {
      const result = await saveCompleteExercise(exercise, endpoint)
      if (result.error) {
        toast.error(`Error: Could not save the activity`)
        throw new Error(result.error);
      } else {
        setSavedFinalExercise(result)
        chooseStepOfProcess("finishedTask")
      }
    } catch (error) {
      console.error('Error saving saving the activity:', error);
      toast.error(`Error: Could not save the activity`)
    } finally {
      setLoading(false)
    }

  }

  const resetCreateActivity = () => {
    setFinalText({ text: "", title: "" })
    resetActivityType()
    setActivityText("")
    createInitialInputObj("")
    createSegmentsFromText(null)
    setNeedHelp(false)
    setVideoData("")
  }

  const setUpButtons = [
    {
      id: 1,
      name: "VIDEO",
      value: "youTubeFillGap"
    },
    {
      id: 2,
      name: "FILL GAP TEXT",
      value: "fillGapText",
    },
    {
      id: 3,
      name: "GAP AND RULES",
      value: "gapAndRules",
      isActive: finalText.text !== "" ? true : false
    }
  ]

  const createExerciseInfo = [
    {
      exerciseType: "AIfillGapText",
      title: "GAP FILL WITH AI EXERCISE",
      img: "./assets/ai-gapFill.webp",
      imgAlt: "AI Gap Fill"
    },
    {
      exerciseType: "fillGapText",
      title: "GAP FILL WITH TEXT EXERCISE",
      img: "./assets/gapFill.webp",
      imgAlt: "Gill Gap Img"
    },
    {
      exerciseType: "youTubeFillGap",
      title: "GAP FILL WITH VIDEO EXERCISE",
      img: "./assets/youtubeGapfill.webp",
      imgAlt: "Video img"
    }
  ]

  const activityButtonArray = setUpButtons.filter(info => !(activityType === "fillGapText" && info.id === 1))

  return (
    <section className="createTextSection">
      <Loading
        loading={loading}
      />

      {activityType === "" && (
        <div className="welcomeCreateActivity">
          <h1 className="createExerciseH1">Create an Exercise</h1>
          <ChooseExercise
            createExerciseInfo={createExerciseInfo}
            updateProcess={updateProcess}
          />
        </div>
      )}

      {/* Titles */}
      {activityType !== "" && activityType !== "AIfillGapText" && (
        activityType === "fillGapText" ?
          <h1 className="createExerciseH1">Text Exercise</h1> :
          <h1 className={`createExerciseH1 H1youtubeTitleCreate`}>Video Exercise</h1>
      )}

      {activityType !== "AIfillGapText" && activityType !== "" && activitySetupStage !== "finishedTask" && (
        <div className="createActivityButtonsDiv">
          <ActivityTypeIndicator
            activityButtonArray={activityButtonArray}
            selectedId={selectedId}
          />
        </div>
      )}

      {activitySetupStage === "AIfillGapText" && (
        <OpenAiCreateTextActivity
          resetCreateActivity={resetCreateActivity}
        />
      )}

      {activityType !== "" && activitySetupStage !== "AIfillGapText" && (
        <div className="mainContentDivCreateExercise">
          {activitySetupStage === "fillGapText" && (
            <AddTextForm
              submitTextForm={submitTextForm}
              setTextTitle={setTextTitle}
              activityText={activityText}
              setActivityText={setActivityText}
              textTitle={finalText.title}
            />
          )}

          {activitySetupStage === "gapAndRules" && (
            <div className="gapsAndRulesContainer">

              {inputsToFill.length > 0 ?
                <div className="gapAndRulesDiv">
                  <div className="gapTextExerciseDiv">
                    <GapText
                      textObj={finalText}
                    />
                  </div>
                  <div className="textInputDiv">
                    <TextInputsToBeSet
                      inputsToFill={inputsToFill}
                      handleInputsSubmitted={handleInputsSubmitted}
                      updateRuleInGap={updateRuleInGap}
                      addRuleToGap={addRuleToGap}
                      submitExercise={submitExercise}
                      updateInputToFill={updateInputToFill}
                      gapIndex={gapIndex}
                    />
                  </div>
                </div>
                :
                <div className="gapAndRulesEmptyDiv">
                  <p>Go back to <strong>Fill Gap Text</strong> to add a text and title</p>
                </div>
              }

              {activitySetupStage === "gapAndRules" && (
                <div className="rulesDiv" >
                  <p className="rulesSearchTitle">RULES</p>
                  <div className="rulesButtonsDiv">
                    <button
                      onClick={() => setSeeSearchBar()}
                      className={seeSearchBar === true ? "rulesSearchButtonSelected" : "rulesSearchButton"}
                    >Search Rule</button>
                    <button
                      onClick={() => setSeeSearchBar()}
                      className={seeSearchBar === false ? "rulesSearchButtonSelected" : "rulesSearchButton"}
                    >Add Rule</button>
                  </div>


                  {seeSearchBar ? (
                    <CreateRuleForm
                      submitRuleForm={submitRuleForm}
                      grammarTitleRef={grammarTitleRef}
                      grammarExplanationRef={grammarExplanationRef}
                    />
                  ) : (
                    < RuleSearchBar
                      searchQuery={searchQuery}
                      search={search}
                      filteredItems={filteredItems}
                      updateRuleInGap={updateRuleInGap}
                    />
                  )}

                </div>
              )}
            </div>
          )}

          {activitySetupStage === "youTubeFillGap" && (
            <div className="createVideoAndGapFillDiv">
              <div className="videoAndSettingsDiv">
                {(activitySetupStage === "youTubeFillGap" || (activitySetupStage === "finishedTask" && activityType === "youTubeFillGap")) && (
                  <YouTube
                    videoId={videoData.videoId}
                    opts={videoData.opts}
                    onReady={(e) => e.target.pauseVideo()}
                  />
                )}
                <CreateYoutubeActivity
                  setVideoObj={setVideoObj}
                  setVideoData={setVideoData}
                />
              </div>

              {/* {activitySetupStage === "youTubeFillGap" && videoObj !== "" && (
                <div className="createYouTubeActivityDiv">
                  <p>If you are happy with the settings click next</p>
                  <ButtonComponent
                    onClickFunction={videoNextButton}
                    className={"primaryGreenButton"}
                    valueToSet={"fillGapText"}
                    buttonText={'Next'}
                  />

                </div>
              )} */}
            </div>
          )}


          {activitySetupStage === "finishedTask" && (
            <div className="savedFinalExerciseDiv">
              {videoData && videoData.videoId !== "" && (
                <div className="youtubeFinishedTask">
                  <YouTube
                    videoId={videoData.videoId}
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

      {activityType !== "AIfillGapText" && activityType !== "" && activitySetupStage !== "finishedTask" && (
        <div className="nextButtonsDiv">
          <NextButtons
            activityButtonArray={activityButtonArray}
            chooseStepOfProcess={chooseStepOfProcess}
            nextButton={nextButton}
            setNextButton={setNextButton}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
          />

          {activitySetupStage === "gapAndRules" && (
            <button className="navButtonsCreateExercise" onClick={() => submitExercise()}>Submit Exercise</button>
          )}
        </div>
      )}

      <CreateGapFillExplanation
        activitySetupStage={activitySetupStage}
        setNeedHelp={setNeedHelp}
        needHelp={needHelp}
      />

      <button
        onClick={() => setNeedHelp(true)}
        className="howToButton howToButtonCreateEx">
      </button>


      {activityType !== "AIfillGapText" && (
        <button
          onClick={() => resetCreateActivity()}
          className="createNewActivityButtonx"
        >Create Exercise</button>
      )}

    </section >
  )
}

export default CreateTextAndVideoExercise



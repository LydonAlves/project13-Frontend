import { useState, useRef, useContext, useEffect, useReducer } from "react";
import "./AudioRecorder.css"
import { DateContext } from "../../context/DateContext";
import CarrouselOfItemsButtons from './../carrouselOfItemsButtons/CarrouselOfItemsButtons';
import { useAuth } from "../../context/AuthContext";
import SpeakingCorrections from './../speakingCorrections/SpeakingCorrections';
import Loading from "../loading/Loading";
import { audioRecorderReducer, INITIAL_AUDIO_RECORDER } from './../../reducers/audioRecorderReducer';
import { startRecording } from "../../functions/audioRecorderFunctions/startRecording";
import { getMicrophonePermission } from "../../functions/audioRecorderFunctions/getMicrophonePermission";
import { stopRecording } from "../../functions/audioRecorderFunctions/stopRecording";
import { uploadToWhisper } from './../../functions/audioRecorderFunctions/uploadToWhispers';
import { fetchCorrections } from './../../functions/audioRecorderFunctions/fetchCorrections';


const AudioRecorder = ({ questions }) => {
  const { userObj } = useAuth()
  const currentDate = useContext(DateContext)
  const date = useContext(DateContext)
  const mimeType = "audio/webm";

  const [stateAudioRecorder, dispatchAudioRecorder] = useReducer(audioRecorderReducer, INITIAL_AUDIO_RECORDER)
  const { currentItemIndex, recordingStatus, audioChunks, audio, audioFile, answersToShow, stream, permission, correctedTextArray, todaysCorrections } = stateAudioRecorder

  const question = questions[currentItemIndex]
  const mediaRecorder = useRef(null)
  const [loading, setLoading] = useState(false)


  console.log("state", stateAudioRecorder);


  useEffect(() => {
    const savedAnswersToShow = localStorage.getItem('answersToShow')
    if (savedAnswersToShow) {
      dispatchAudioRecorder({ type: 'ADD_TO_CORRECTED_TEXT_ARRAY', payload: JSON.parse(savedAnswersToShow) })
    }
  }, [])

  useEffect(() => {
    if (userObj) {
      setLoading(true)
      fetchCorrections(dispatchAudioRecorder, currentDate, userObj)
      setLoading(false)
    }
  }, [userObj])

  //todo Look over the below again to see if it can replace this useEffect and the following one
  useEffect(() => {

    //todo Look over the below again to see if it can replace this useEffect and the following one
    if (todaysCorrections.length > 0) {
      const corrections = todaysCorrections.find(item => item.question.id === question.id)

      dispatchAudioRecorder({ type: 'SET_ANSWERS_TO_SHOW', payload: corrections })
    }

  }, [currentItemIndex, todaysCorrections])

  useEffect(() => {
    if (correctedTextArray.length > 0) {
      const answers = correctedTextArray.find((item) => item.question.id === question.id)
      dispatchAudioRecorder({ type: 'SET_ANSWERS_TO_SHOW', payload: answers })
    }
  }, [correctedTextArray])

  useEffect(() => {
    dispatchAudioRecorder({ type: 'RESET_AUDIO' })
  }, [currentItemIndex])

  useEffect(() => {
    localStorage.setItem('answersVideo', JSON.stringify(answersToShow));
  }, [answersToShow])


  const handleMicrophonePermission = () => {
    getMicrophonePermission(dispatchAudioRecorder)
  }

  const handleStartRecording = () => {
    startRecording(dispatchAudioRecorder, mediaRecorder, stream, mimeType)
  }

  const handleStopRecording = () => {
    stopRecording(dispatchAudioRecorder, mediaRecorder, audioChunks, mimeType)
  }

  const handleCorrectSpeaking = () => {
    uploadToWhisper(dispatchAudioRecorder, setLoading, question, date, userObj, audioFile)
  }


  const redoRecording = () => {
    dispatchAudioRecorder({ type: 'RESET_AUDIO' })
  }

  return (
    <>
      <Loading
        loading={loading}
      />
      <div className="speakingPracticeContainer">
        {!answersToShow && (
          <div className="audio-controls">
            <h1 className="speakingPracticeQuestion">{question.text}</h1>
            {!permission ? (
              <button onClick={handleMicrophonePermission} type="button" className="speakingPracticeButton">
                Get Microphone
              </button>
            ) : null}
            {permission && recordingStatus === "inactive" && !answersToShow ? (
              <div>
                <button className="speakingPracticeButton" onClick={handleStartRecording} type="button">
                  Start Recording
                </button>
              </div>
            ) : null}
            {recordingStatus === "recording" ? (
              <button className="speakingPracticeButton recordingInProgress" onClick={handleStopRecording} type="button">
                Stop Recording
              </button>
            ) : null}

          </div>
        )}

        {audio && !answersToShow && (
          <div className="audio-container">
            <audio className="audioRecorder" src={audio} controls></audio>
            <p className="audioContainerText">Listen to your answer and if you are happy with it click the button below</p>
            <div className="correctSpeakButtonsDiv">
              <button
                className="primaryGreenButton correctSpeakingButton"
                onClick={() => handleCorrectSpeaking()}
                type="button">
                Correct my speaking
              </button>
              <button
                onClick={() => redoRecording()}
                className="primaryGreenButton correctSpeakingButton"
              >Back</button>
            </div>
          </div>
        )}


        {answersToShow && (
          <SpeakingCorrections
            answersToShow={answersToShow}
          />
        )}

        <div className="voiceToTextNextButtons">
          <CarrouselOfItemsButtons
            items={questions}
            dispatch={dispatchAudioRecorder}
            currentItemIndex={currentItemIndex}
          />
        </div>
      </div>
    </>
  );
};
export default AudioRecorder;



import { useState, useRef, useContext, useEffect } from "react";
import "./voiceToText.css"
import { checkRequestStatus, saveSpeakingCorrection } from "./saveSpeakingCorrections";
import { DateContext } from "../../../context/DateContext";
import CarrouselOfItemsButtons from "../../../components/carrouselOfItemsButtons/CarrouselOfItemsButtons";
import { useAuth } from "../../../context/AuthContext";
import SpeakingCorrections from "../../../components/speakingCorrections/SpeakingCorrections";
import Loading from "../../../components/loading/Loading";
import { fetchByUser } from "../../../utils/fetchByUser";
import { backendURL } from "../../../utils/backendURL";

const AudioRecorder = ({ questions }) => {
  const date = useContext(DateContext)
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioFile, setAudioFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const question = questions[currentItemIndex];
  const [answersToShow, setAnswersToShow] = useState()
  const [todaysCorrections, setTodaysCorrections] = useState([])

  const { userObj } = useAuth()
  const currentDate = useContext(DateContext)

  const extractDate = (isoString) => {
    return isoString.split('T')[0];
  };
  const currentDateWithoutTime = extractDate(currentDate)

  useEffect(() => {
    const fetchCorrections = async () => {
      setLoading(true)
      try {
        const result = await await fetchByUser("speakingCorrection", userObj._id);
        if (result.error) {
          throw new Error(result.error);
        } else {
          const todaysCorrections = result.filter(item => extractDate(item.date) === currentDateWithoutTime)
          setTodaysCorrections(todaysCorrections)
        }
      } catch (error) {
        console.error('Error fetching speaking corrections:', error);
        toast.error(`Error: We had some difficulty loading data`)

      } finally {
        setLoading(false)
      }
    }

    if (userObj) {
      fetchCorrections()
    }
  }, [userObj])


  useEffect(() => {
    if (todaysCorrections.length > 0) {
      const corrections = todaysCorrections.find(item => item.question.id === question.id)
      setAnswersToShow(corrections)
    }

  }, [currentItemIndex, todaysCorrections])


  const [correctedTextArray, setCorrectedTextArray] = useState(() => {
    const savedAnswersToShow = localStorage.getItem('answersToShow');
    return savedAnswersToShow ? JSON.parse(savedAnswersToShow) : [];
  });

  useEffect(() => {
    localStorage.setItem('answersVideo', JSON.stringify(answersToShow));
  }, [answersToShow]);


  useEffect(() => {
    if (correctedTextArray.length > 0) {
      const answers = correctedTextArray.find((item) => item.question.id === question.id)
      setAnswersToShow(answers)
    }
  }, [correctedTextArray])


  const mimeType = "audio/webm";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");

    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };
  console.log("audio chunk", audioChunks);

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);

      const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      setAudioFile(file)
      setAudioChunks([]);

    };
  };

  const uploadToWhisper = async () => {
    if (audioFile) {
      const formData = new FormData();
      formData.append('file', audioFile);
      setLoading(true)

      try {
        const response = await fetch(`${backendURL}openai/uploadTranscribe`, {
          method: "POST",
          body: formData
        });

        const result = await response.json()
        console.log("speaking corrections", result);


        //! I have asked chat to help me send this and check it every 2 seconds closing the async each time. Read there and see if it helps
        const statusData = await checkRequestStatus(result.hash);
        console.log("status", statusData);


        let speakingResult

        waitForDesiredStatus(result.hash)
          .then(statusData => {
            console.log('Final status data:', statusData);
            speakingResult = {
              question: question,
              corrections: statusData.jsonObject,
              date: date,
              createdBy: userObj._id
            }

          })
          .catch(error => {
            console.error('Error occurred:', error);
          });



        // saveSpeakingCorrection(speakingResult, setCorrectedTextArray)
        if (speakingResult) {
          const pendingCorrections = await saveSpeakingCorrection(speakingResult)
          console.log("pending corrections", pendingCorrections);
        }

        //? Got to put the below into the above so that Status Data (which is the exercise) can be saved

      } catch (error) {
        console.error('Error uploading the file:', error);
      }
      setLoading(false)
    }
  }



  //*------------------------------------------------------------------------------------------
  const waitForDesiredStatus = async (hash) => {

    let statusData;
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      attempts++;
      try {
        statusData = await checkRequestStatus(hash);
        console.log("status data", statusData);

        if (statusData.jsonObject) {
          console.log('Desired status received:', statusData);
          break;
        }
      } catch (error) {
        console.error('Error checking status:', error);
        break;
      }

      // Wait for 2 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (attempts >= maxAttempts) {
      console.log(`Maximum attempts reached (${maxAttempts}). Exiting.`);
    }

    return statusData;
  };
  //*------------------------------------------------------------------------------------------

























  const redoRecording = () => {
    setAudio(null)
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
              <button onClick={getMicrophonePermission} type="button" className="speakingPracticeButton">
                Get Microphone
              </button>
            ) : null}
            {permission && recordingStatus === "inactive" && !answersToShow ? (
              <div>
                <button className="speakingPracticeButton" onClick={startRecording} type="button">
                  Start Recording
                </button>
              </div>
            ) : null}
            {recordingStatus === "recording" ? (
              <button className="speakingPracticeButton" onClick={stopRecording} type="button">
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
                onClick={() => uploadToWhisper()}
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
            setCurrentItemIndex={setCurrentItemIndex}
            currentItemIndex={currentItemIndex}
          />
        </div>
      </div>
    </>
  );
};
export default AudioRecorder;



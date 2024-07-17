import React, { useEffect, useReducer, useState } from 'react'
import "./CreateYoutubeActivity.css"
import TimeInput from './timeInput/TimeInput';
import { INITIAL_VIDEO_STATE, videoReducer } from '../../hooks/VideoFormatReducer';
import formatTime from './videoListeningFunctions/formatTime';
import AddYoutubeLink from './addYouTubeLink/AddYoutubeLink';
import { editYouTubeLink } from './videoListeningFunctions/editYouTubeLink';
import { toast } from 'react-toastify';

const CreateYoutubeActivity = ({ setVideoObj, setVideoData }) => {
  const [stateVideoData, dispatchVideoData] = useReducer(videoReducer, INITIAL_VIDEO_STATE)
  const { opts, chosenTimes } = stateVideoData;
  const { videoId, playerVars: { start, end } } = opts;
  const { startTimeSaved, endTimeSaved } = chosenTimes

  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [videoLink, setVideoLink] = useState()


  useEffect(() => {
    if (setVideoObj) {
      setVideoObj(stateVideoData)
    }
    const dataToRunVideo = {
      opts: opts,
      videoId: videoId
    }
    setVideoData(dataToRunVideo)
  }, [stateVideoData])


  const submitVideoData = () => {
    if (!videoLink) {
      toast.warning('Please add a video URL to continue');
      return
    }

    const startTimeInSeconds = formatTime(startTime)
    const endTimeinSeconds = formatTime(endTime)
    const editedURl = editYouTubeLink(videoLink)

    const createOpts = {
      width: "100%",
      height: "100%",
      borderRadius: "2rem",
      videoId: editedURl,
      playerVars: {
        autoplay: 0,
        start: isNaN(startTimeInSeconds) ? 0 : startTimeInSeconds,
        end: isNaN(endTimeinSeconds) ? null : endTimeinSeconds,
      },
    }

    dispatchVideoData({
      type: "UPDATE_CHOSEN_TIMES",
      payload: {
        startTimeSaved: startTime,
        endTimeSaved: endTime
      }
    })

    dispatchVideoData({
      type: 'UPDATE_VIDEO_PARAMS',
      payload: createOpts
    })
  }

  return (
    <>
      <div className='videoSettingsContainer'>
        <div className='videoSettingsDiv'>
          <div className='videoSettingTimeInputDiv'>
            <TimeInput title={"Start time:"} time={startTime} setTime={setStartTime} />
            {start === 0 ? <p>Add a start time in the input</p> : <p>{startTimeSaved}</p>}
          </div>
          <div className='videoSettingTimeInputDiv'>
            < TimeInput title={"End time:"} time={endTime} setTime={setEndTime} />
            {end === 0 ? <p>Add an end time in the input</p> : <p>{endTimeSaved}</p>}
          </div>
          <div className='addYoutubeLinkAndButtonDiv'>
            <AddYoutubeLink setVideoLink={setVideoLink} />
            <button onClick={() => submitVideoData()} className='submitVideoTimeButton'>Submit video and time</button>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export default CreateYoutubeActivity


import React, { useEffect, useReducer, useState } from 'react'
import "./CreateYoutubeActivity.css"
import { INITIAL_VIDEO_STATE, videoReducer } from '../../reducers/videoFormatReducer';
import { toast } from 'react-toastify';
import formatTime from '../../functions/videoFunctions/formatTime';
import { editYouTubeLink } from '../../functions/videoFunctions/editYouTubeLink';
import TimeInput from '../timeInput/TimeInput';



const CreateYoutubeActivity = ({ dispatch }) => {
  const [stateVideoData, dispatchVideoData] = useReducer(videoReducer, INITIAL_VIDEO_STATE)
  const { opts, chosenTimes } = stateVideoData;
  const { videoId, playerVars: { start, end } } = opts;
  const { startTimeSaved, endTimeSaved } = chosenTimes
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [videoLink, setVideoLink] = useState()

  useEffect(() => {
    dispatch({
      type: 'SET_VIDEO_DATA',
      payload: {
        chosenTimes: chosenTimes,
        opts: opts,
      }
    })

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
            <div className="addYoutubeLinkDiv">
              <p className="addYoutubeLinkTitle">Add a YouTube link below</p>
              <input
                onChange={(e) => setVideoLink(e.target.value)}
                className="addYoutubeLinkInput"
              />
            </div>
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


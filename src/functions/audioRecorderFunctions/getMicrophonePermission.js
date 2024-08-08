import { toast } from "react-toastify";

export const getMicrophonePermission = async (dispatch) => {
  if ("MediaRecorder" in window) {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      dispatch({ type: 'SET_PERMISSION', payload: streamData })
    } catch (err) {
      toast.error(err.message)
    }
  } else {
    toast.warning(`The MediaRecorder API is not supported in your browser.`)
  }
} 
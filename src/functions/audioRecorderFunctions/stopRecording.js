export const stopRecording = (dispatch, mediaRecorder, audioChunks, mimeType) => {

  mediaRecorder.current.stop()
  mediaRecorder.current.onstop = () => {

    const audioBlob = new Blob(audioChunks, { type: mimeType })
    const audioUrl = URL.createObjectURL(audioBlob)
    const file = new File([audioBlob], 'recording.webm', { type: mimeType })

    dispatch({
      type: 'STOP_RECORDING', payload: { audioFile: file, audio: audioUrl }
    })
  }
} 
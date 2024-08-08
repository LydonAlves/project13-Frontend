export const startRecording = async (dispatch, mediaRecorder, stream, mimeType) => {
  const media = new MediaRecorder(stream, { type: mimeType });

  mediaRecorder.current = media;
  mediaRecorder.current.start();
  let localAudioChunks = [];
  mediaRecorder.current.ondataavailable = (event) => {
    if (typeof event.data === "undefined") return;
    if (event.data.size === 0) return;
    localAudioChunks.push(event.data);
  }

  dispatch({
    type: 'START_RECORDING', payload: {
      audioChunks: localAudioChunks
    }
  })
}; 
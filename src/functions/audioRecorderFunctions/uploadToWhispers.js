import { toast } from "react-toastify";
import { saveSpeakingCorrection } from '../studentsPageFunctions.js/saveSpeakingCorrections';
import { backendURL } from './../../utils/backendURL';
import { waitForDesiredStatus } from "../AIApiFunctions/waitForDesiredStatus";

export const uploadToWhisper = async (dispatch, setLoading, question, date, userObj, audioFile) => {
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
      console.log("whisper result", result);

      let speakingResult

      waitForDesiredStatus(result.hash, "request")
        .then(statusData => {
          speakingResult = {
            question: question,
            corrections: statusData.jsonObject,
            date: date,
            createdBy: userObj._id
          }
          saveSpeakingCorrection(speakingResult, setLoading, dispatch)
          setLoading(false)
        })

        .catch(error => {
          console.error('Error occurred:', error);
          toast.error(`Error: We had some difficulty with the AI corrections`)
          setLoading(false)
        });

    } catch (error) {
      console.error('Error uploading the file:', error);
      toast.error(`Error: We had some difficulty with the AI corrections`)
    }

  }
}
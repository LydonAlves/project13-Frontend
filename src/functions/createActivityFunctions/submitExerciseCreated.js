import { toast } from "react-toastify";
import { saveCompleteExercise } from "./saveCompleteExercise";
import { createNewExercise } from "./createNewExercise";

export const submitExerciseCreated = async (userObj, date, dispatchExercise, stateExercise, stateFinalExercise, setLoading) => {
  const { inputsToFill } = stateExercise
  const finalText = stateFinalExercise.textObj
  const video = stateFinalExercise.video

  if (finalText.text === "" || finalText.title === "") {
    toast.error(`Error: You have to add a text and title before continuing`);
    return
  }
  if (inputsToFill.some(answer => !answer.rule)) {
    toast.error(`Error: You have to add a rule to each gap before continuing`);
    return
  }

  const userId = userObj._id
  const exercise = createNewExercise(finalText, inputsToFill, userId, video, date)
  const endpoint = video.opts.videoId !== "" ? 'videoExercise' : 'gapfillText';


  setLoading(true)
  try {
    const result = await saveCompleteExercise(exercise, endpoint)
    if (result.error) {
      toast.error(`Error: Could not save the activity`)
      throw new Error(result.error);
    } else {
      dispatchExercise({
        type: 'CREATE_EXERCISE_PAGE_VALUES',
        payload: {
          savedFinalExercise: result,
          currentStep: 3
        }
      })
    }
  } catch (error) {
    console.error('Error saving saving the activity:', error);
    toast.error(`Error: Could not save the activity`)
  } finally {
    setLoading(false)
  }
}

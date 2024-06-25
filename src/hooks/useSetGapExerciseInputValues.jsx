import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from "react"
import { DateContext } from '../context/DateContext';


const useSetGapExerciseInputValues = () => {
  const [gapIndex, setGapindex] = useState(null)
  const date = useContext(DateContext)


  const updateGapIndex = (value) => {
    setGapindex(value)
  }

  const createNewExercise = (finalText, inputsToFill, userId, videoObj) => {
    if (videoObj) {
      console.log("save video working");
      return {
        dateCreated: date,
        textObj: finalText,
        answers: inputsToFill,
        video: videoObj,
        createdBy: userId
      }
    } else {
      console.log("save text Working");
      return {
        answers: inputsToFill,
        dateCreated: date,
        textObj: finalText,
        createdBy: userId
      }
    }
  }


  return {
    gapIndex,
    updateGapIndex,
    createNewExercise
  }
}

export default useSetGapExerciseInputValues 
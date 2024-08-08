export const createNewExercise = (finalText, inputsToFill, userId, videoObj, date) => {
  if (videoObj) {
    return {
      dateCreated: date,
      textObj: finalText,
      answers: inputsToFill,
      video: videoObj,
      createdBy: userId
    }
  } else {
    return {
      answers: inputsToFill,
      dateCreated: date,
      textObj: finalText,
      createdBy: userId
    }
  }
}
import { v4 as uuidv4 } from 'uuid';

export const createInitialInputObj = (initialInputs) => {
  if (initialInputs === "") {
    return null
  } else {
    const inputObject = initialInputs.map((input) => {
      return {
        answer: input,
        rule: {},
        correctAnswer: false,
        id: uuidv4()
      }
    }
    )
    return inputObject
  }
}
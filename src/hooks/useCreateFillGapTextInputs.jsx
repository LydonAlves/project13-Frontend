import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const useCreateFillGapTextInputs = () => {
  const [inputsToFill, setInputsToFill] = useState([])

  const createInitialInputObj = (initialInputs) => {
    if (initialInputs === "") {
      let inputs = null
      setInputsToFill(inputs)
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
      setInputsToFill(inputObject)
    }

  }

  const updateInputToFill = (value) => {
    setInputsToFill(value)
  }

  return {
    inputsToFill,
    updateInputToFill,
    createInitialInputObj
  }
}

export default useCreateFillGapTextInputs
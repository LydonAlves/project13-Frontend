export const checkIfInputsFull = (inputs, initialInputs, setInitialAnswersSubmitted) => {
  if (inputs !== undefined) {
    const allInputsFilled = inputs.length === initialInputs.length ? true : false
    if (allInputsFilled) {
      setInitialAnswersSubmitted(true)
    }
  }
}


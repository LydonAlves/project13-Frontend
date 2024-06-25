import { useState } from "react"

const useActivitySetupProcess = () => {
  const [activitySetupStage, setActivitySetupStage] = useState("")
  const [activityType, setActivityType] = useState("")

  const updateProcess = (value) => {
    if ((value === "fillGapText" || "youTubeFillGap") && activityType === "") {
      setActivityType(value)
    }
    setActivitySetupStage(value)
  }


  const chooseStepOfProcess = (value) => {
    setActivitySetupStage(value)
  }

  const resetActivityType = () => {
    setActivityType("")
    setActivitySetupStage("")
  }


  return {
    activitySetupStage,
    updateProcess,
    activityType,
    chooseStepOfProcess,
    resetActivityType
  }
}

export default useActivitySetupProcess
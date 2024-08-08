import './ChooseExercise.css'

const ChooseExercise = ({ createExerciseInfo, dispatchExercise }) => {

  const handleSelection = (value) => {
    let steps
    let currentStep

    if (value === "youTubeFillGap") {
      steps = [0, 1, 2, 3]
      currentStep = 0
    } else if (value === "fillGapText") {
      steps = [1, 2, 3]
      currentStep = 1
    } else {
      currentStep = 4
    }


    dispatchExercise({
      type: 'CREATE_EXERCISE_PAGE_VALUES',
      payload: {
        exerciseType: value,
        stepId: steps,
        currentStep: currentStep
      }
    })
  }


  return (
    <div className="chooseExercisecontainer" >
      {createExerciseInfo.map((info, index) => (
        <div className="chooseExerciseDiv" key={index}>
          <div className="exerciseTitleDiv">
            <p className="exerciseTitleCreateEPage">{info.title}</p>
          </div>
          <img src={info.img} alt={info.imgAlt} className="chooseExerciseImg" />
          <button
            onClick={() => handleSelection(info.exerciseType)}
            className='selectButtonCreateE'
          >SELECT</button>
        </div>
      ))}
    </div>
  )
}

export default ChooseExercise
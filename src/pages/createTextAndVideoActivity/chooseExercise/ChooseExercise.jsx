import './ChooseExercise.css'

const ChooseExercise = ({ createExerciseInfo, updateProcess }) => {
  return (
    <div className="chooseExercisecontainer" >
      {createExerciseInfo.map((info, index) => (
        <div className="chooseExerciseDiv" key={index}>
          <div className="exerciseTitleDiv">
            <p className="exerciseTitleCreateEPage">{info.title}</p>
          </div>
          <img src={info.img} alt={info.imgAlt} className="chooseExerciseImg" />
          <button
            onClick={() => updateProcess(info.exerciseType)}
            className='selectButtonCreateE'
          >SELECT</button>
        </div>
      ))}
    </div>
  )
}

export default ChooseExercise
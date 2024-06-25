import { useEffect, useState } from 'react'
import "./GapFill.css"
import FillGapForm from '../../components/fillGapForm/FillGapForm'
import { createSegmentsFromText } from '../../utils/createSegmentsFromText'
import AnswerList from '../../components/fillGapForm/answerList/AnswerList'
import { checkIfInputsFull } from '../../components/fillGapForm/fillGapFormFunctions/checkIfInputsFull'
import { updateAnswers } from '../../components/fillGapForm/fillGapFormFunctions/updateAnswers'


const GapFill = ({ chosenText, inputs, setInputs }) => {
  const [answers, setAnswers] = useState([])
  const [textAndTitle, setTextAndTitle] = useState("")
  const [text, setText] = useState("")
  const [initialAnswersSubmitted, setInitialAnswersSubmitted] = useState(false)
  console.log("chosen text", chosenText);
  console.log("inputs", inputs);


  useEffect(() => {
    setAnswers(chosenText.answers)
    setText(chosenText.textObj.text)
    setTextAndTitle(chosenText.textObj)
  }, [chosenText])

  useState(() => {
    if (inputs && inputs.length > 0) {
      setInitialAnswersSubmitted(true)
    }
  }, [])


  //?---needed in other pages
  //todo ----- answers block---------------------------------------
  const [answerList, setAnswerList] = useState(answers || [])
  useEffect(() => {
    setAnswerList(answers)
  }, [answers])


  const [showExplanationIndex, setShowExplanationIndex] = useState(null)
  //todo ----- answers block---------------------------------------


  //?---initial inputs is necessary to have the number of inputs and compare them
  //todo ----- inputs block---------------------------------------
  const { initialInputs } = createSegmentsFromText(text)
  // const [inputs, setInputs] = useState([])

  const handleInputChange = (index, e) => {
    const updateInputs = [...inputs]
    updateInputs[index] = {
      number: index,
      answer: e.target.value,
    }
    setInputs(updateInputs)
  }
  //todo ----- inputs block---------------------------------------


  const submitGapFillExercise = (e) => {
    e.preventDefault()
    if (initialAnswersSubmitted === false) {
      checkIfInputsFull(inputs, initialInputs, setInitialAnswersSubmitted)
    }
    setAnswerList(updateAnswers(inputs, answerList))
  }

  const handleExplanationToggle = (index) => {
    setShowExplanationIndex(showExplanationIndex === index ? null : index)
  }


  return (
    <>
      <div className='gapfillDiv'>
        {textAndTitle && (
          <div className='fillGapFormGapFill'>
            <FillGapForm
              textObj={textAndTitle}
              inputs={inputs}
              submit={submitGapFillExercise}
              initialAnswersSubmitted={initialAnswersSubmitted}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
        {initialAnswersSubmitted === true && (
          <div className='gapFillAnswerList'>
            <AnswerList
              answerList={answerList}
              handleExplanationToggle={handleExplanationToggle}
              inputs={inputs}
              showExplanationIndex={showExplanationIndex}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default GapFill





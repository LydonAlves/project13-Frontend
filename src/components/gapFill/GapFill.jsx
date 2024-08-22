import { useEffect, useReducer, useState } from 'react'
import "./GapFill.css"
import FillGapForm from '../../components/fillGapForm/FillGapForm'
import { createSegmentsFromText } from '../../functions/fillGapFormFunctions/createSegmentsFromText'
import AnswerList from '../answerList/AnswerList'
import { updateAnswers } from '../../functions/fillGapFormFunctions/updateAnswers'
import { toast } from 'react-toastify'
import { gapFillReducer, INITIAL_GAPFILL } from '../../reducers/gapFillReducer'

const GapFill = ({ chosenText, inputs, }) => {

  const [stateGapfill, dispatchGapfill] = useReducer(gapFillReducer, INITIAL_GAPFILL)
  const { answerList, textAndTitle } = stateGapfill
  const { initialInputs } = createSegmentsFromText(textAndTitle.text)
  const [manageInputs, setManageInputs] = useState(inputs)
  const [initialAnswersSubmitted, setInitialAnswersSubmitted] = useState(false)

  useEffect(() => {
    dispatchGapfill({ type: "SET_UP_GAPFILL", payload: { answers: chosenText.answers, textAndTitle: chosenText.textObj } })
  }, [chosenText])

  useState(() => {
    if (inputs && inputs.length > 0) {
      setInitialAnswersSubmitted(true)
      dispatchGapfill({ type: 'SET_MANAGE_INPUTS', payload: inputs })
    }
  }, [inputs])


  const handleInputChange = (index, e) => {
    const updateInputs = [...manageInputs]

    updateInputs[index] = {
      number: index,
      answer: e.target.value,
    }
    setManageInputs(updateInputs)
  }

  const submitGapFillExercise = (e) => {
    e.preventDefault()
    if (!initialAnswersSubmitted) {
      const updatedList = updateAnswers(answerList, manageInputs);

      const allInputsFilled = manageInputs.length === initialInputs.length;
      if (!allInputsFilled) {
        toast.error('You have to fill all the gaps before you can check the answer');
      } else {
        setInitialAnswersSubmitted(true);
        setManageInputs(updatedList);
      }
    } else if (initialAnswersSubmitted) {
      const updatedList = updateAnswers(answerList, manageInputs)
      setInitialAnswersSubmitted(true);
      setManageInputs(updatedList);
    }
  }


  return (
    <>
      <div className='gapfillDiv'>
        {textAndTitle && (
          <div className='fillGapFormGapFill'>
            <FillGapForm
              textObj={textAndTitle}
              inputs={manageInputs}
              submit={submitGapFillExercise}
              initialAnswersSubmitted={initialAnswersSubmitted}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
        {initialAnswersSubmitted === true && answerList !== null && manageInputs.length > 0 && (
          <div className='gapFillAnswerList'>
            <AnswerList
              answerList={answerList}
              inputs={manageInputs}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default GapFill





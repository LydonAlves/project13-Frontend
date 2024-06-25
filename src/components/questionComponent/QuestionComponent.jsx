import { useState } from 'react'

const QuestionComponent = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionAnswer, setQuestionAnswer] = useState("")


  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => (prev + 1) % questions.length)
  }

  const previousQuestion = () => {
    setCurrentQuestionIndex(prev => (prev - 1 + questions.length) % questions.length)
  }


  return (
    <div>
      {questions.length > 0 && (
        <>
          <h2>{questions[currentQuestionIndex].text}</h2>
          <textarea onChange={(e) => setQuestionAnswer(e.target.value)} />
          <p className='openAiResponse'></p>
          <div>
            <button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
            <button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
          </div>
        </>
      )}

    </div>
  )
}

export default QuestionComponent 
export const updateAnswers = (inputs, answerList) => {
  console.log(answerList);
  return answerList.map((answer, index) => {
    if (index < answerList.length) {
      const userEntry = inputs[index]
      if (userEntry && userEntry.answer === answer.answer) {
        return { ...answer, correctAnswer: true }
      } else {
        return { ...answer, correctAnswer: false };
      }
    }
  })
}
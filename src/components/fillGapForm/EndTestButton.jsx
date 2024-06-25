const EndTestButton = ({
  setChosenText,
  toggleAnswerSubmitted,
  isAnswerSubmitted }) => {
  return (
    <>
      <button onClick={() => {
        setChosenText("");;
        if (isAnswerSubmitted === true) { toggleAnswerSubmitted() }
      }}>End test</button>
    </>
  )
}

//!see if this is needed
// export default EndTestButton
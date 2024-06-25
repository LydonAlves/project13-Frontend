const TextsToChooseFrom = ({ setChosenText, texts }) => {
  return (
    <>
      <ul>
        {texts.map((text, index) => (
          <div key={index}>
            <p>{text.textTitle} </p>
            <button onClick={() => setChosenText(text)}>Choose exercise</button>
          </div>)
        )}
      </ul>
    </>
  )
}

//! see if this is needed
// export default TextsToChooseFrom

import "./AddTextForm.css"

const AddTextForm = ({
  submitTextForm,
  setTextTitle,
  activityText,
  setActivityText,
  textTitle
}) => {
  return (
    <form className="addTextForm" onSubmit={(e) => { submitTextForm(e) }} >
      <label className="addTitleText">Add your title here</label>
      <input className="addTitleInput" placeholder={textTitle} type="text" onChange={(e) => setTextTitle(e.target.value)} />
      <label className="addTitleText">Add your text here</label>
      <textarea className="addTextTextarea" value={activityText} onChange={(e) => setActivityText(e.target.value)} />
      <button type="submit" className="greenButtonColorOnly submitButtonAddText">SUBMIT TEXT</button>
    </form>
  )
}

export default AddTextForm
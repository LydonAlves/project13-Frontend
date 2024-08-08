import { useEffect, useState } from "react"
import "./AddTextForm.css"
import { toast } from "react-toastify"
import { createTextSegments } from "../../functions/createActivityFunctions/createTextSegments"

const AddTextForm = ({
  dispatchExercise,
  stateFinalExercise,
  dispatchFinalExercise
}) => {
  const [title, setTitle] = useState()
  const [text, setText] = useState()
  const textObj = stateFinalExercise.textObj

  useEffect(() => {
    if (textObj) {
      setTitle(textObj.title)
      setText(textObj.text)
    }
  }, [])

  const submitTextForm = (e) => {
    e.preventDefault()
    if (!title || !text) {
      toast.warning('You need to add a title and text to continue')
      return
    }

    const { initialInputs } = createTextSegments(text)

    dispatchExercise({
      type: 'CREATE_EXERCISE_PAGE_VALUES',
      payload: {
        initialInputs: initialInputs,
        currentStep: 2,

      },
    })

    dispatchFinalExercise({
      type: 'UPDATE_FINAL_EXERCISE',
      payload: {
        textObj: {
          text: text,
          title: title,
        }
      },
    })

  }


  return (
    <form className="addTextForm" onSubmit={(e) => { submitTextForm(e) }} >
      <label className="addTitleText">Add your title here</label>
      <input className="addTitleInput" value={title || ""} type="text" onChange={(e) => setTitle(e.target.value)} />
      <label className="addTitleText">Add your text here</label>
      <textarea className="addTextTextarea" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit" className="greenButtonColorOnly submitButtonAddText">SUBMIT TEXT</button>
    </form>
  )
}

export default AddTextForm
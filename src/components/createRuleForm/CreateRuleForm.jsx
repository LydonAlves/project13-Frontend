import "./CreateRuleForm.css"

const CreateRuleForm = ({
  submitRuleForm,
  grammarTitleRef,
  grammarExplanationRef
}) => {

  return (
    <>
      <form className="createRule" onSubmit={submitRuleForm}>
        <p className="addRuleTitle">Create a new rule</p>
        <input type="text" ref={grammarTitleRef} className="inputCreateRule" />
        <p className="addRuleTitle">Add an explanation</p>
        <textarea ref={grammarExplanationRef} className="textareaCreateRule" />
        <button className="buttonCreateRule" type="submit">Add</button>
      </form>
    </>
  )
}

export default CreateRuleForm 
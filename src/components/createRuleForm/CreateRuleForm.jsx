import { toast } from "react-toastify";
import "./CreateRuleForm.css"
import { useRef } from "react";
import { saveRule } from "../../functions/createRuleFunctions/saveRule";
import { fetchRules } from './../../functions/createRuleFunctions/fetchRules';

const CreateRuleForm = ({
  dispatchExercise,
  setLoading
}) => {
  const grammarTitleRef = useRef();
  const grammarExplanationRef = useRef();

  const createRule = async (e) => {
    e.preventDefault()

    const grammarTitle = grammarTitleRef.current.value.trim()
    const grammarExplanation = grammarExplanationRef.current.value.trim()

    if (!grammarTitle || !grammarExplanation) return

    const newRule = {
      title: grammarTitle,
      explanation: grammarExplanation,
    }

    try {
      const savedRule = await saveRule(newRule);
      console.log(savedRule);

      fetchRules(dispatchExercise, setLoading)

      grammarTitleRef.current.value = ""
      grammarExplanationRef.current.value = ""
    } catch (error) {
      toast.warning('Error: the rule was not saved correctly')
      console.error("Error saving rule:", error);
    }
  }


  return (
    <>
      <form className="createRule" onSubmit={createRule}>
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
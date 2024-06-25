import { useRef } from "react"
import { saveRule } from "../components/createRuleForm/createRuleFunctions/saveRule";

const useCreateNewRule = () => {
  const grammarTitleRef = useRef()
  const grammarExplanationRef = useRef()


  const createRule = async () => {

    const grammarTitle = grammarTitleRef.current.value
    if (grammarTitle === "") return
    const grammarExplanation = grammarExplanationRef.current.value
    if (grammarExplanation === "") return

    const newRule = {
      title: grammarTitle,
      explanation: grammarExplanation,
    }

    let savedRule = saveRule(newRule)
    return savedRule
  }

  return {
    grammarTitleRef,
    grammarExplanationRef,
    createRule

  }
}

export default useCreateNewRule  
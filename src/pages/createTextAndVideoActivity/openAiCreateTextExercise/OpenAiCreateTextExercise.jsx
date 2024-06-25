import { useState } from "react";
import "./OpenAiCreateTextExercise.css"
import GapText from "../../../components/fillGapForm/gapText/GapText";
import MockupAnswerList from "../../../components/fillGapForm/mockupAnswerList/MockupAnswerList";
import useSetGapExerciseInputValues from "../../../hooks/useSetGapExerciseInputValues";
import { saveCompleteExercise } from "../functionsCreateActivity/saveCompleteExercise";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/Loading";
import { backendURL } from "../../../utils/backendURL";


const OpenAiCreateTextExercise = ({ resetCreateActivity }) => {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false)
  const { createNewExercise } = useSetGapExerciseInputValues()
  const { userObj } = useAuth()

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  //! Error settings done
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backendURL}v1/openai/createExamAi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log(data);
      saveActivity(data)
    } catch (error) {
      console.error('Error sending the message:', error);
      toast.error(`Error: We had some difficulty loading data`)
    } finally {
      setLoading(false)
    }

  };

  //! Error settings done
  const saveActivity = async (data) => {
    const userId = userObj._id
    let finalText = data.gapFill.textObj
    let answers = data.gapFill.answers
    let finalExercise = createNewExercise(finalText, answers, userId)
    setLoading(true)
    try {
      const result = await saveCompleteExercise(finalExercise, 'gapfillText')

      if (result.error) {
        throw new Error(result.error);
      } else {
        setResponse(result)
      }
    } catch (error) {
      console.error('Error saving the AI created activity:', error);
      toast.error(`Error: Could not save the activity`)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="openAiCreateTextDiv">
      <Loading
        loading={loading}
      />
      <h1 className={`createExerciseH1 aiH1`}>AI Exercise</h1>
      {response === "" && (
        <div className="divCreateExercise">
          <h1 className="titleCreateExercise">Create Exercise</h1>
          <p className="textCreateExercise">Write a word or phrase to indicate what you want the topic of the text to be about</p>

          <input
            value={content}
            onChange={handleInputChange}
            placeholder="Enter your word or phrase here"
            className="inputCreateTextOpenai"
          />
          <div className="divInputCreateExerciseButtons">
            <button onClick={handleSubmit} className="sendMessageButton">CREATE</button>
            <button onClick={() => resetCreateActivity()} className="goBackButtonCreateTextOpenai" >GO BACK</button>
          </div>

        </div>
      )}
      {response !== "" && (
        <div className="OpenAiCreateTextActivityExampleDiv">
          <div className="openAiGapFill">
            <GapText
              textObj={response.textObj}
            />

            <div className="OpenAiCreateTextFooterDiv">
              <p className="OpenAiCreateTextCreatedFooter">Your exercise has been created, it will now be available  in Class Manager</p>
              <button
                onClick={() => resetCreateActivity()}
                className="OpenAiCreateTextCreatedFooterButton greenButtonColorOnly"
              >Save and continue</button>
            </div>
          </div>

          <MockupAnswerList
            answerList={response.answers}
          />
        </div>
      )}
    </div>
  );
};

export default OpenAiCreateTextExercise;
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
import { waitForDesiredStatus } from "../../../utils/AIApiFunctions/waitForDesiredStatus";
import { checkRequestStatus } from "../../../utils/AIApiFunctions/checkRequestStatus";
import { openAiCreateTextFunction } from './../../../utils/AIApiFunctions/openAiCreateTextFunction';

const OpenAiCreateTextExercise = ({ resetCreateActivity }) => {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false)
  const { createNewExercise } = useSetGapExerciseInputValues()
  const { userObj } = useAuth()

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true)
    // const openAiCreateTextFunction= (content,saveActivity )=>{
    //   try {
    //     const res = await fetch(`${backendURL}openai/createExamAi`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ content }),
    //     });

    //     if (!res.ok) {
    //       throw new Error('Network response was not ok');
    //     }

    //     const result = await res.json();
    //     const statusData = await checkRequestStatus(result.hash, "exam");
    //     console.log(statusData);

    //     // waitForDesiredStatus(result.hash, "exam")
    //     //   .then(statusData => {
    //     //     console.log(statusData);
    //     //     saveActivity(statusData)
    //     //   })
    //     try {
    //       const desiredStatusData = await waitForDesiredStatus(result.hash, "exam");
    //       console.log(desiredStatusData);
    //       saveActivity(desiredStatusData);
    //     } catch (error) {
    //       console.error('Error waiting for desired status:', error);
    //     }


    //   } catch (error) {
    //     console.error('Error sending the message:', error);
    //     toast.error(`Error: We had some difficulty loading data`)
    //   }
    // }
    const activityCreated = await openAiCreateTextFunction()

    if (activityCreated) {
      saveActivity(activityCreated)
    }
    setLoading(false)
  };


  const saveActivity = async (data) => {
    const userId = userObj._id
    // console.log(data); 

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
      {response !== "" && (
        <p className="OpenAiCreateTextCreatedFooter">Your exercise has been created, it will now be available  in Class Manager</p>
      )}
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
import { toast } from "react-toastify";
import { waitForDesiredStatus } from "./waitForDesiredStatus";
import { backendURL } from "../../utils/backendURL";

export const openAiCreateTextFunction = async (content) => {
  try {
    const res = await fetch(`${backendURL}openai/createExamAi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await res.json();

    const desiredStatusData = await waitForDesiredStatus(result.hash, "exam");
    console.log(desiredStatusData)

    return desiredStatusData

  } catch (error) {
    console.error('Error sending the message:', error)
    toast.error(`Error: We had some difficulty loading data`)
  }
} 
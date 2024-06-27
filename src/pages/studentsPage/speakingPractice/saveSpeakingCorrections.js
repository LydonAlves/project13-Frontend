import { backendURL } from './../../../utils/backendURL';

export const saveSpeakingCorrection = async (exercise) => {
  console.log("exercise", exercise);
  const headers = {
    "Content-Type": "application/json"
  }
  if (!exercise.corrections) {
    return
  }

  try {
    const response = await fetch(`${backendURL}speakingCorrection`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(exercise)
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(data);
    // if (setCorrectedTextArray) {
    //   setCorrectedTextArray(prev => {
    //     return [...prev, data]
    //   })
    // }

    console.log("Speaking correction saved:", data);
    return data.hash
  } catch (error) {
    console.error('Error in saving speaking correction:', error);
    return { error: `Failed to save: ${error.message}` };
  }
}


export const checkRequestStatus = async (hash) => {

  try {

    //!------------------------------------------------------
    const response = await fetch(`${backendURL}openai/request/status/${hash}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Status:', data.status);
    console.log('Content:', data.content);

    return data;
  } catch (error) {
    console.error('Error checking request status:', error);
    return { error: `Failed to check status: ${error.message}` };
  }
};

// export const checkRequestStatus = async (hash, interval = 5000, maxAttempts = 10) => {
//   let attempts = 0;

//   const poll = async (resolve, reject) => {
//     attempts++;
//     try {
//       const response = await fetch(`${backendURL}openai/request/status/${hash}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Status:', data.status);
//       console.log('Content:', data.content);

//       if (data.status === 'completed' || data.status === 'error' || attempts >= maxAttempts) {
//         resolve(data);
//       } else {
//         setTimeout(() => poll(resolve, reject), interval);
//       }
//     } catch (error) {
//       if (attempts >= maxAttempts) {
//         reject(new Error(`Failed to check status after ${attempts} attempts: ${error.message}`));
//       } else {
//         setTimeout(() => poll(resolve, reject), interval);
//       }
//     }
//   };

//   return new Promise(poll);
// };

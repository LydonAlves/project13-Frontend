export const saveSpeakingCorrection = async (exercise, setCorrectedTextArray) => {
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const response = await fetch("http://localhost:3000/api/v1/speakingCorrection",
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
    if (setCorrectedTextArray) {
      setCorrectedTextArray(prev => {
        return [...prev, data]
      })
    }
    console.log("Speaking correction saved:", data);
    return data
  } catch (error) {
    console.error('Error in saving speaking correction:', error);
    return { error: `Failed to save: ${error.message}` };
  }
}

export const saveRule = async (rule) => {
  const headers = {
    "Content-Type": "application/json"
  }
  // console.log(rule);

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/rules`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(rule)
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`rule saved:`, data);
    return data
  } catch (error) {
    console.error('Error in saving rule:', error);
    return { error: `Failed to save: ${error.message}` };
  }
}
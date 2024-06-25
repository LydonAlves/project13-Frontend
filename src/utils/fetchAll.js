export const fetchAll = async (url) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/${url}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // console.log(valueRetrieved);
    // setValue(valueRetrieved)
    return data
  } catch (error) {
    console.error(`Could not fetch ${url}:`, error)
    throw error;
  }
}


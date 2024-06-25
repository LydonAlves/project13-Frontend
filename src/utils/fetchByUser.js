export const fetchByUser = async (url, userId) => {
  // console.log(userId);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/${url}/by-userId/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data
    // console.log(data);
    // setItem(data ? data : [])
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { error: `Failed to fetch ${url}: ${error.message}` };
  }
};

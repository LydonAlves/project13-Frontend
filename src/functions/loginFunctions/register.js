
import { backendURL } from './../../utils/backendURL';

export const registerFunction = async (registerObj) => {
  const { userName, email, password, country } = registerObj

  try {
    const response = await fetch(`${backendURL}user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password, country })
    });

    if (!response.ok) {
      if (response.status === 410) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return;
    }

    const data = await response.json();
    console.log('Registration successful');
    return data

  } catch (error) {
    console.error('Registration failed', error);
    toast.error(`Error: ${error.message}`);
  }
}
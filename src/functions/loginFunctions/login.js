import { toast } from "react-toastify";
import { backendURL } from "../../utils/backendURL";

export const loginFunction = async (registerObj) => {
  const { email, password } = registerObj

  const response = await fetch(`${backendURL}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (!response.ok) {
    toast.error(`Error: ${error.message}`);
    throw new Error(result.error || 'An unknown error occurred');
  }

  return result

}
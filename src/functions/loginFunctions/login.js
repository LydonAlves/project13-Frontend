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
  })

  console.log(response);

  if (response.status == 401) {
    toast.error(`Error: The email or password are incorect`)
    return
  }

  const result = await response.json()

  return result

}



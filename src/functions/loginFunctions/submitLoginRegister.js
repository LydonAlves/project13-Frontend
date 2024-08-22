import { toast } from "react-toastify";
import { loginFunction } from "./login";
import { registerFunction } from "./register";

export const submitForm = async (isRegister, setLoading, dispatch, registerObj) => {
  const { password, repeatPassword, login } = registerObj

  if (isRegister && password !== repeatPassword) {
    toast.error(`Error: the passwords don't match`);
    return;
  }

  setLoading(true);
  try {
    let result
    if (isRegister) {
      result = await registerFunction(registerObj);
      dispatch({ type: 'SET_REGISTRATION_DATA', payload: result });
      toast.success("Registration successful");
    } else {
      result = await loginFunction(registerObj);
      login(result);
    }
    if (result == 401) {
      toast.error(`Error: ${result}`)
    }

  } catch (error) {
    toast.error(`Error: ${result}`)
    console.error(isRegister ? "Error during registration:" : "Login failed", error);
  } finally {
    setLoading(false);
  }
};  
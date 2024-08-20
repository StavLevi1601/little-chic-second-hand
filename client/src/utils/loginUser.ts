import axios from "axios";
import { LoginSchema } from "../validations/loginSchema";

export const loginUser = async ({ email, password }: LoginSchema) => {
  try {
    const auth = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth`, {
      email,
      password,
    });

    if (auth.status === 200) {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.data.token}`,
          },
        }
      );
      localStorage.setItem("token", auth.data.token);

      return result;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

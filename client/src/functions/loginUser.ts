import axios from "axios";

type Props = {
  username: string;
  email: string;
  password: string;
};

export const loginUser = async ({ username, password }: Props) => {
  try {
    const auth = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth`, {
      username,
      password,
    });

    if (auth.status === 200) {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/login`,
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.data.token}`,
          },
        }
      );
      return result;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

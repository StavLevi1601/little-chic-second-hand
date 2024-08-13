import axios from "axios";

type Props = {
  username: string;
  email: string;
  password: string;
};

export const signupUser = async ({ username, password }: Props) => {
  console.log(username, password);
  alert("nice");
  const auth = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth`, {
    username,
    password,
  });

  if (auth.status === 200) {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}users/signup`,
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
    console.log(result);
  }
};

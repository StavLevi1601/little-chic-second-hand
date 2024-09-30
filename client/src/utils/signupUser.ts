import axios from 'axios';
import { LoginSchema } from '../validations/loginSchema';

export const signupUser = async ({ email, password }: LoginSchema) => {
  // console.log(email, password);
  alert('nice');
  const auth = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth`, {
    email,
    password,
  });

  console.log('200', auth);
  if (auth.status === 200) {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}users/signup`,
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
    console.log(result);
  }
};

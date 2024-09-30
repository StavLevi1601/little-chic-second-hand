import React, { useState } from 'react';
import {
  Container,
  Header,
  Inputs,
  Input,
  Submit,
  Error,
  SubHeader,
  ButtonAction,
  DividerWithText,
} from './login.style';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginUser } from '../../utils/loginUser';
import { signupUser } from '../../utils/signupUser';
import { LoginSchema, loginSchema } from '../../validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../../store/useAuthState';
import { useNavigate } from 'react-router-dom';

type Action = 'sign_up' | 'login';

export default function Login(): JSX.Element {
  const { login, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate(); // יצירת useNavigate

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [action, setAction] = useState<Action>('sign_up');

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    if (action === 'sign_up') {
      await signupUser(data);
    }
    if (action === 'login') {
      const result = await loginUser(data);
      if (result?.status === 200) {
        const user = result.data.user;
        console.log('user', user._id.toString());
        user.id = user._id.toString();
        login(user);
        setIsAuthenticated(true);
        navigate('/');
      }
    }
  };

  const handleAction = () => {
    if (action === 'sign_up') {
      setAction('login');
    } else {
      setAction('sign_up');
    }
  };

  return (
    <Container>
      <Header>{action === 'sign_up' ? 'Sign Up' : 'Login'}</Header>
      <SubHeader>
        Already a member?{' '}
        <ButtonAction onClick={handleAction}>
          {action === 'sign_up' ? 'Login' : 'Sign Up'}
        </ButtonAction>
      </SubHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <Input type="text" placeholder="email" {...register('email')} />
          <Error>{errors.email ? errors.email.message : ''}</Error>
          <Input type="password" placeholder="Password" {...register('password')} />
          <Error>{errors.password ? errors.password.message : ''}</Error>

          <Submit>{action === 'sign_up' ? 'Sign Up' : 'Login'}</Submit>
        </Inputs>
        <DividerWithText>
          {action === 'sign_up' ? 'or sign up with' : 'or login with'}
        </DividerWithText>
        <GoogleOAuthProvider clientId="43146293136-peiao5lqgf02ng8pg1q88bie80vbjpg9.apps.googleusercontent.com">
          <div>
            <GoogleLogin onSuccess={() => console.log('Success')} />
          </div>
        </GoogleOAuthProvider>
      </form>
    </Container>
  );
}

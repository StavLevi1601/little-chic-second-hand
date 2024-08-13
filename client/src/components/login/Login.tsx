import React, { useState } from "react";
import {
  Container,
  Header,
  Inputs,
  Input,
  SubmitContainer,
  Submit,
  SubmitWhite,
} from "./LoginStyled";
import { useFormContext } from "react-hook-form";
import { loginUser } from "../../functions/loginUser";
import { signupUser } from "../../functions/signupUser";
import { useNavigate } from "react-router-dom";
export default function Login(): JSX.Element {
  const [action, setAction] = useState("Sign Up");
  const navigation = useNavigate();
  const { handleSubmit, register, reset } = useFormContext();

  const onSubmit = async (data) => {
    if (action === "Sign Up") {
      await signupUser(data);
    }
    if (action === "Log in") {
      const redirectPath = await loginUser(data);
      if (redirectPath?.status === 200) {
        navigation("/welcome");
      }
    }
    reset();
  };

  return (
    <Container>
      <Header>{action}</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <Input type="text" placeholder="Username" {...register("username")} />
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <SubmitContainer>
            {action === "Sign Up" ? (
              <>
                <Submit type="submit">Sign Up</Submit>
                <SubmitWhite onClick={() => setAction("Log in")}>
                  Log In
                </SubmitWhite>
              </>
            ) : (
              <>
                <SubmitWhite onClick={() => setAction("Sign Up")}>
                  Sign Up
                </SubmitWhite>
                <Submit type="submit">Log In</Submit>
              </>
            )}
          </SubmitContainer>
        </Inputs>
      </form>
    </Container>
  );
}

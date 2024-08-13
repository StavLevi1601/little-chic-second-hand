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
import { SubmitHandler, useFormContext } from "react-hook-form";
import { loginUser } from "../../functions/loginUser";
import { signupUser } from "../../functions/signupUser";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../validations/loginSchema";

type Action = "sign_up" | "login";

export default function Login(): JSX.Element {
  const [action, setAction] = useState<Action>("sign_up");
  const navigation = useNavigate();
  const { handleSubmit, register, reset } = useFormContext<LoginSchema>();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    if (action === "sign_up") {
      await signupUser(data);
    }
    if (action === "login") {
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
            {action === "sign_up" ? (
              <>
                <Submit type="submit">sign_up</Submit>
                <SubmitWhite onClick={() => setAction("login")}>
                  login
                </SubmitWhite>
              </>
            ) : (
              <>
                <SubmitWhite onClick={() => setAction("sign_up")}>
                  sign_up
                </SubmitWhite>
                <Submit type="submit">login</Submit>
              </>
            )}
          </SubmitContainer>
        </Inputs>
      </form>
    </Container>
  );
}

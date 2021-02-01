import React, { FormEvent } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { Button, Container, Form, Input } from "./Input";

const SignUp = () => {
  const { inputs, errors, setInputs, submit } = useSignUp();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <Container>
      <h3>CREATE ACCOUNT</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          error={errors.userNameError}
          name={"User Name"}
          type={"text"}
          placeholder={"Enter UserName"}
          value={inputs.userName}
          onChange={(e) => setInputs.setUserName(e.target.value)}
        />
        <Input
          error={errors.emailError}
          name={"Email"}
          type={"text"}
          placeholder={"Enter Email"}
          value={inputs.email}
          onChange={(e) => setInputs.setEmail(e.target.value)}
        />
        <Input
          error={errors.passwordError}
          name={"Password"}
          type={"password"}
          placeholder={"Enter Password"}
          value={inputs.password}
          onChange={(e) => setInputs.setPassword(e.target.value)}
        />
        <Input
          error={errors.confirmPasswordError}
          name={"Confirm Password"}
          type={"password"}
          placeholder={"Confirm Password"}
          value={inputs.confirmPassword}
          onChange={(e) => setInputs.setConfirmPassword(e.target.value)}
        />
        <Button type="submit">SUBMIT</Button>
      </Form>
    </Container>
  );
};

export default SignUp;

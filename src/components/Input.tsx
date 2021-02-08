import React from "react";
import styled from "styled-components";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";

const { mobileMaxWidth, primaryFont } = styles;
const { gunmetal, primaryColorTwo, primaryColorOne } = colorScheme;

export const Container = styled.div`
  border-radius: 20px;
  box-shadow: 5px 5px ${primaryColorOne};
  position: fixed;
  top: 25vh;
  left: 50%;
  transform: translatex(-50%);
  background-color: ${primaryColorTwo};
  color: ${gunmetal};
  text-align: center;
  font-family: "Raleway", sans-serif;
  padding: 50px;
  & h3 {
    padding-top: 0;
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 80%;
    padding: 20px;
  }
`;

export const Form = styled.form`
  width: 300px;
`;

export const Button = styled.button<{ isActive: boolean }>`
  cursor: ${(props) => (props.isActive ? "pointer" : "default")};
  background-color: ${(props) => (props.isActive ? "orange" : "grey")};
  border: none;
  padding: 5px;
  border-radius: 3px;
  font-family: ${primaryFont};
  min-width: 150px;
  color: ${primaryColorTwo};
  &:hover {
    background-color: ${(props) => (props.isActive ? "black" : "grey")};
  }
`;

const FormGroup = styled.div<{
  error: boolean;
}>`
  margin: 10px 0;
  background-color: ${(props) =>
    props.error ? colorScheme.redOrange : colorScheme.accentColorOne};
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
`;

const Label = styled.label<{ error?: string }>`
  width: 40%;
  color: ${(props) => (props.error ? "white" : "black")};
`;

const InputDiv = styled.input`
  width: 55%;
  border: none;
  background-color: transparent;
  outline: none;
`;

interface IProps {
  error: string;
  name: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  error,
  name,
  type,
  placeholder,
  value,
  onChange,
}: IProps) => {
  return (
    <FormGroup error={!!error}>
      <Label htmlFor={name} error={error}>
        {name}
      </Label>
      <InputDiv
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div style={{ width: "100%", color: "white" }}>{error}</div>
    </FormGroup>
  );
};

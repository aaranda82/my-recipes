import React from "react";
import styled from "styled-components";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";

const { mobileMaxWidth, primaryFont } = styles;
const {
  gunmetal,
  primaryColorTwo,
  primaryColorOne,
  accentColorOne,
  redOrange,
} = colorScheme;

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
  background-color: ${(props) => (props.isActive ? accentColorOne : "grey")};
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
  border-radius: 10px;
  border: 1px solid ${(props) => (props.error ? redOrange : accentColorOne)};
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
`;

const Label = styled.label<{ error?: string }>`
  width: 40%;
  color: ${accentColorOne};
`;

const InputDiv = styled.input`
  width: 55%;
  border: none;
  background-color: transparent;
  outline: none;
`;
const Item = styled.div<{ height?: string; width?: string }>`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 20px;
  & > textarea {
    font-size: 1rem;
    line-height: 1.5rem;
    height: ${(props) => props.height};
    width: 100%;
    font-family: ${primaryFont};
    font-weight: 600;
    outline: none;
  }
  & > input {
    font-size: 1rem;
    line-height: 1.5rem;
    height: 2.5rem;
    width: ${(props) => props.width};
    outline: none;
  }
  & > label {
    margin: 5px 0;
    width: 100%;
  }
`;

const Error = styled.div`
  width: 100%;
  color: ${redOrange};
`;

interface IProps {
  error: string;
  name: string;
  type: "text" | "password" | "number";
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IPropsInput extends IProps {
  width: string;
}

interface IPropsTextArea {
  error: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height: string;
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
      <Error>{error}</Error>
    </FormGroup>
  );
};

export const AddRecipeInput = ({
  error,
  name,
  type,
  placeholder,
  value,
  onChange,
  width,
}: IPropsInput) => {
  return (
    <Item width={width}>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Error>{error}</Error>
    </Item>
  );
};

export const AddRecipeTextArea = ({
  error,
  name,
  placeholder,
  value,
  onChange,
  height,
}: IPropsTextArea) => {
  return (
    <Item height={height}>
      <label htmlFor={name}>{name}</label>
      <textarea value={value} onChange={onChange} placeholder={placeholder} />
      <Error>{error}</Error>
    </Item>
  );
};

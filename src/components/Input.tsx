import React from "react";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";

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

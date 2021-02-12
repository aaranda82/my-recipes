import React, { FormEvent, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../styles/colorScheme";

const { accentColorOne } = colorScheme;

const Button = styled.button`
  height: 27px;
  border: none;
  background: ${accentColorOne};
`;

const Input = styled.input`
  height: 25px;
  padding: 0;
  border: 1px solid ${accentColorOne};
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SVG = styled.svg`
  height: 15px;
  width: 15px;
  fill: white;
`;

const SearchFilter = (): ReactElement => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    history.push(`/search/${search.toLowerCase()}`);
    setSearch("");
  };

  return (
    <div style={{ position: "relative" }}>
      <Form onSubmit={submitSearch}>
        <label>
          <Input
            list="recipes"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </label>
        <Button type="submit" style={{ height: "27px" }}>
          <SVG xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 136 136.219">
            <path d="M93.148 80.832c16.352-23.09 10.883-55.062-12.207-71.41S25.88-1.461 9.531 21.632C-6.816 44.723-1.352 76.693 21.742 93.04a51.226 51.226 0 0055.653 2.3l37.77 37.544c4.077 4.293 10.862 4.465 15.155.387 4.293-4.075 4.465-10.86.39-15.153a9.21 9.21 0 00-.39-.39zm-41.84 3.5c-18.245.004-33.038-14.777-33.05-33.023-.004-18.246 14.777-33.04 33.027-33.047 18.223-.008 33.008 14.75 33.043 32.972.031 18.25-14.742 33.067-32.996 33.098h-.023zm0 0" />
          </SVG>
        </Button>
      </Form>
    </div>
  );
};

export default SearchFilter;

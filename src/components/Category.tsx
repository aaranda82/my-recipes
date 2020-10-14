import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";

const { primaryColorOne } = ColorScheme;
interface CBProps {
  selected: boolean;
}
const CategoryButton = styled.div<CBProps>`
  margin: 5px 20px 0;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    color: ${primaryColorOne};
  }
`;

const Category = (
  index: number,
  changeCategory: (categoryToShow: string) => void,
  selected: boolean,
  cat: string
) => {
  return (
    <React.Fragment key={index}>
      <CategoryButton
        id="category"
        onClick={() => changeCategory(cat)}
        selected={selected}
      >
        {cat}
      </CategoryButton>
      {selected ? <Spacer /> : null}
    </React.Fragment>
  );
};

export default Category;

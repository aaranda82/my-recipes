import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../../ColorScheme";

const { accentColorOne } = ColorScheme;
interface CBProps {
  selected: boolean;
}
const CategoryButton = styled.div<CBProps>`
  width: 100px;
  display: inline-block;
  font-family: "Raleway", sans-serif;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => props.selected? accentColorOne: ""};
  color: ${(props) => props.selected? "white": ""};
  border-radius: 50px;
  &:hover {
    background-color: lightgrey;
  }
`;

const Category = (
  index: number,
  changeCategoryToShow: (categoryToShow: string) => void,
  selected: boolean,
  cat: string
) => {
  return (
    <React.Fragment key={index}>
      <CategoryButton
        className="category"
        onClick={() => changeCategoryToShow(cat)}
        selected={selected}
      >
        <div>
          {cat}
        </div>
      </CategoryButton>
    </React.Fragment>
  );
};

export default Category;

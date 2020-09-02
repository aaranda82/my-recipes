import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const CategoryButton = styled.a`
  margin: 0 20px;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${ColorScheme.gunmetal};
  }
`;

const Category = (
  index: number,
  changeCategory: (categoryToShow: string) => void,
  color: string | undefined,
  cat: string
) => {
  return (
    <CategoryButton
      id="category"
      key={index}
      onClick={() => changeCategory(cat)}
    >
      <div style={{ color: color }}>{cat}</div>
    </CategoryButton>
  );
};

export default Category;

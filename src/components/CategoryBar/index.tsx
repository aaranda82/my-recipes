import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../../ColorScheme";
import { Styles } from "../../Styles";

const { accentColorOne } = ColorScheme;
const { mobileMaxWidth } = Styles;

const Button = styled.div<{
  selected: boolean;
}>`
  margin-horizontal: 4px;
  padding: 2px 8px;
  display: inline-block;
  font-family: "Raleway", sans-serif;
  text-align: center;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? accentColorOne : "")};
  color: ${({ selected }) => (selected ? "white" : "")};
  border-radius: 4px;
  &:hover {
    background-color: lightgrey;
  }
`;

const CategoriesDisplayedCont = styled.div`
  width: 100%;
  margin: 8px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: ${mobileMaxWidth}) {
    overflow: auto;
  }
`;

const CategoryBar = ({
  categories,
  categoryToShow,
  changeCategoryToShow,
}: {
  categories: string[];
  categoryToShow: string;
  changeCategoryToShow: (c: string) => void;
}) => {
  const renderCategory = (category: string, index: number) => {
    return (
      <Button
        key={`category_button_${index}`}
        className="category"
        onClick={() => changeCategoryToShow(category)}
        selected={categoryToShow === category}>
        {category}
      </Button>
    );
  };

  return (
    <CategoriesDisplayedCont id="Categories">
      {categories.map(renderCategory)}
    </CategoriesDisplayedCont>
  );
};

export default CategoryBar;

import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { categoryAction } from "../actions/categoryAction";
import { colorScheme } from "../colorScheme";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

const { gunmetal, accentColorOne } = colorScheme;
const { secondaryFont, mobileMaxWidth, tabletMaxWidth } = styles;

const CategoryBarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoriesContent = styled.div`
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: ${tabletMaxWidth}) {
    width: 700px;
    overflow: auto;
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 350px;
  }
`;

const SlideContainer = styled.div`
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: ${mobileMaxWidth}) {
    overflow: auto;
  }
`;

const Slide = styled.div<{ catPage: number }>`
  transform: translateX(-${(props) => props.catPage * 800}px);
  transition: all 0.7s ease;
`;

const CatButtonCont = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CatButton = styled.button`
  @media (max-width: ${tabletMaxWidth}) {
    display: none;
  }
`;

const CatTitle = styled.div`
  width: 70%;
  font-family: ${secondaryFont};
  font-size: 30px;
  color: ${gunmetal};
  text-align: center;
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 20px;
  }
`;

const Button = styled.div<{ selected: boolean }>`
  width: 90px;
  margin: 0 5px;
  display: inline-block;
  font-family: "Raleway", sans-serif;
  text-align: center;
  cursor: pointer;
  background-color: ${(p) => (p.selected ? accentColorOne : "")};
  color: ${(p) => (p.selected ? "white" : "")};
  border-radius: 5px;
  &:hover {
    background-color: lightgrey;
  }
`;

const CategoryBar = ({
  categories,
}: {
  categories: string[];
}): ReactElement => {
  const [categoryPage, setCategoryPage] = useState(0);
  const categoryToShow = useSelector(
    (state: RootState) => state.categoryReducer,
  );
  const dispatch = useDispatch();

  const category = (index: number, selected: boolean, cat: string) => {
    return (
      <Button
        key={index}
        className="category"
        onClick={() => dispatch(categoryAction(cat))}
        selected={selected}>
        <div>{cat}</div>
      </Button>
    );
  };

  const decrimentCategoryPage = () => {
    const catPage = categoryPage <= 0 ? 0 : categoryPage - 1;
    setCategoryPage(catPage);
  };

  const incrementCategoryPage = () => {
    if (categoryPage + 1 >= categories.length / 8) {
      return;
    }
    setCategoryPage(categoryPage + 1);
  };

  const renderCategories = () => {
    const catElements = categories.map((cat, index) => {
      const selected = categoryToShow === cat;
      return category(index, selected, cat);
    });
    return catElements;
  };

  const handleCatArrowButton = (cb: () => void, icon: string) => {
    return (
      <CatButtonCont>
        <CatButton
          onClick={() => {
            cb();
          }}>
          <i className={icon} />
        </CatButton>
      </CatButtonCont>
    );
  };

  return (
    <CategoryBarDiv>
      <CategoriesContent>
        {handleCatArrowButton(decrimentCategoryPage, "fas fa-arrow-left")}
        <CatTitle>Categories</CatTitle>
        {handleCatArrowButton(incrementCategoryPage, "fas fa-arrow-right")}
        <SlideContainer id="Categories">
          <Slide catPage={categoryPage}>{renderCategories()}</Slide>
        </SlideContainer>
      </CategoriesContent>
    </CategoryBarDiv>
  );
};

export default CategoryBar;

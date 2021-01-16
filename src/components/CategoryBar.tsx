import React, { Component, ReactElement } from "react";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
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

interface IProps {
  categories: string[];
  categoryToShow: string;
  changeCategoryToShow: (categoryToShow: string) => void;
}

interface IState {
  categoryPage: number;
}

class CategoryBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { categoryPage: 0 };
  }

  category(index: number, selected: boolean, cat: string): ReactElement {
    const { changeCategoryToShow } = this.props;
    return (
      <Button
        key={index}
        className="category"
        onClick={() => changeCategoryToShow(cat)}
        selected={selected}>
        <div>{cat}</div>
      </Button>
    );
  }

  decrimentCategoryPage(): void {
    const { categoryPage } = this.state;
    const catPage = categoryPage <= 0 ? 0 : categoryPage - 1;
    this.setState({ categoryPage: catPage });
  }

  incrementCategoryPage(): void {
    const { categoryPage } = this.state;
    const { categories } = this.props;
    if (categoryPage + 1 >= categories.length / 8) {
      return;
    }
    this.setState({ categoryPage: categoryPage + 1 });
  }

  renderCategories(): ReactElement[] {
    const { categories, categoryToShow } = this.props;
    const catElements = categories.map((cat, index) => {
      const selected = categoryToShow === cat;
      return this.category(index, selected, cat);
    });
    return catElements;
  }

  render(): ReactElement {
    const { categoryPage } = this.state;
    return (
      <CategoryBarDiv>
        <CategoriesContent>
          <CatButtonCont>
            <CatButton
              onClick={() => {
                this.decrimentCategoryPage();
              }}>
              <i className="fas fa-arrow-left" />
            </CatButton>
          </CatButtonCont>
          <CatTitle>Categories</CatTitle>
          <CatButtonCont>
            <CatButton
              onClick={() => {
                this.incrementCategoryPage();
              }}>
              <i className="fas fa-arrow-right" />
            </CatButton>
          </CatButtonCont>
          <SlideContainer id="Categories">
            <Slide catPage={categoryPage}>{this.renderCategories()}</Slide>
          </SlideContainer>
        </CategoriesContent>
      </CategoryBarDiv>
    );
  }
}

export default CategoryBar;

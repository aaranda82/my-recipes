import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../../ColorScheme";
import { Styles } from "../../Styles";
import Category from "./Category";

const { gunmetal } = ColorScheme;
const { secondaryFont, mobileMaxWidth, tabletMaxWidth } = Styles;

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

const CategoriesDisplayedCont = styled.div`
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: ${mobileMaxWidth}) {
    overflow: auto;
  }
`;

interface CDProps {
  catPage: number;
}

const CategoriesDisplayed = styled.div<CDProps>`
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

interface IProps {
  categories: string[];
  categoryToShow: string;
}

interface IState {
  categories: string[];
  categoryPage: number;
  categoryToShow: string;
}

class CategoryBar extends Component<IProps, IState> {
  constructor(props: IState) {
    super(props);
    this.state = {
      categories: ["ALL"],
      categoryPage: 0,
      categoryToShow: "ALL",
    };
    this.changeCategoryToShow = this.changeCategoryToShow.bind(this);
  }

  changeCategoryToShow(categoryToShow: string) {
    this.setState({ categoryToShow });
  }

  decrimentCategoryPage() {
    let categoryPage;
    if(this.state.categoryPage <= 0) {
      categoryPage = 0  
    } else {
      categoryPage = this.state.categoryPage - 1;
    }
    this.setState({ categoryPage })
  }

  incrementCategoryPage() {
    if((this.state.categoryPage + 1) >= this.state.categories.length / 8 ){
      return false;
    } else {
      this.setState({ categoryPage: this.state.categoryPage + 1})
    }
  }

  renderCategories() {
    
    const catElements = this.state.categories.map((cat, index) => {
      let selected = this.state.categoryToShow === cat ? true : false;
      return Category(index, this.changeCategoryToShow, selected, cat);
    });
    return catElements;
  }

  componentDidMount() {
    const { categories } = this.props;
    const { categoryToShow } = this.props;
    this.setState({
      categories,
      categoryToShow
    })
  }

  render() {
    return (
      <CategoryBarDiv>
        <CategoriesContent>
          <CatButtonCont>
            <CatButton onClick={()=>{this.decrimentCategoryPage()}}><i className="fas fa-arrow-left"></i></CatButton>
          </CatButtonCont>
          <CatTitle>Categories</CatTitle>
          <CatButtonCont>
            <CatButton onClick={()=>{this.incrementCategoryPage()}}><i className="fas fa-arrow-right"></i></CatButton>
          </CatButtonCont>
          <CategoriesDisplayedCont id="Categories">
            <CategoriesDisplayed catPage={this.state.categoryPage}>
              {this.renderCategories()}
            </CategoriesDisplayed>
          </CategoriesDisplayedCont>
        </CategoriesContent>
      </CategoryBarDiv>

    )
  }
}

export default CategoryBar;
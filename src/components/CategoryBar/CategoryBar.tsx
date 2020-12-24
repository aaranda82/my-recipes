import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../../ColorScheme";
import { Styles } from "../../Styles";

const { gunmetal, accentColorOne } = ColorScheme;
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

const Button = styled.div<{selected: boolean}>`
  width: 100px;
  display: inline-block;
  font-family: "Raleway", sans-serif;
  text-align: center;
  cursor: pointer;
  background-color: ${(p) => p.selected? accentColorOne: ""};
  color: ${(p) => p.selected? "white": ""};
  border-radius: 50px;
  &:hover {
    background-color: lightgrey;
  }
`;

interface IProps {
  categories: string[],
  categoryToShow: string,
  changeCategoryToShow: (categoryToShow: string) => void, 
}

interface IState {
  categoryPage: number; 
}

class CategoryBar extends Component<IProps, IState>{
  constructor(props: IProps){
    super(props);
    this.state = { categoryPage: 0 }
  }   

  category( index: number, selected: boolean, cat: string) {
    return (
      <Button
        key={index}
        className="category"
        onClick={() => this.props.changeCategoryToShow(cat)}
        selected={selected}>
        <div>{cat}</div>
      </Button>
    );
  };

  renderCategories() {
    const catElements = this.props.categories.map((cat, index) => {
      let selected = this.props.categoryToShow === cat ? true : false;
      return this.category(index, selected, cat);
    });
    return catElements;
  }

  decrimentCategoryPage() {
    const categoryPage = this.state.categoryPage <= 0 ? 0 : this.state.categoryPage - 1;
    this.setState({ categoryPage })
  }

  incrementCategoryPage() {
    if((this.state.categoryPage + 1) >= this.props.categories.length / 8 ){
      return false;
    } else {
      this.setState({ categoryPage: this.state.categoryPage + 1})
    }
  }

  render(){
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
          <SlideContainer id="Categories">
            <Slide catPage={this.state.categoryPage}>
              {this.renderCategories()}
            </Slide>
          </SlideContainer>
        </CategoriesContent>
      </CategoryBarDiv>
    )
  }
}

export default CategoryBar;

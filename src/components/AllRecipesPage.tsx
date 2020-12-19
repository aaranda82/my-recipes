import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import recipeData from "../data-recipes.json";
import userData from "../data-users.json";
import RecipeCard, { BlankRecipeCard } from "./RecipeCard";
import Category from "./Category";
import { withRouter, RouteComponentProps } from "react-router";
const { gunmetal, accentColorOne, primaryColorTwo } = ColorScheme;
const { secondaryFont, mobileMaxWidth, tabletMaxWidth } = Styles;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: white;
`;

const CategoriesContent = styled.div`
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  background: white;
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

const RVSCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RVSProps {
  bgColor: string | null;
  textColor: string | null;
}

const RViewSelector = styled.div<RVSProps>`
  width: 20%;
  height: 20px;
  border: 1px solid lightgrey;
  text-align: center;
  padding: 10px;
  font-family: ${secondaryFont};
  cursor: pointer;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 10px;
  } ;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px 0;
  @media (max-width: ${mobileMaxWidth}) {
    box-shadow: none;
  }
`;

const Recipes = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${mobileMaxWidth}) {
    width: 100%;
  }
`;

 export function handleRecipeArrayLength(allRecipes: JSX.Element[]) {
  if (window.screen.width < 500) {
    return allRecipes;
  } else {
    if (allRecipes.length > 4 && allRecipes.length % 4 !== 0) {
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length % 4 !== 0);
    } else if (allRecipes.length < 4) {
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length <= 3);
    }
    return allRecipes;
  }
}

interface Recipe {
  recipeId: number;
  createdBy: string;
  name: string;
  category: string;
  servings: number;
  ingredients: { name: string; quantity: string; unit: string }[];
  instructions: { number: number; instruction: string }[];
}

interface IState {
  categories: string[];
  categoryPage: number;
  categoryToShow: string;
  recipesToShow: string;
}

class AllRecipesPage extends Component<
  RouteComponentProps<{ id: string }>,
  IState
> {
  constructor(props: RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      categories: ["ALL"],
      categoryPage: 0,
      categoryToShow: "ALL",
      recipesToShow: "ALL RECIPES",
    };
    this.changeCategoryToShow = this.changeCategoryToShow.bind(this);
  }

  changeCategoryToShow(categoryToShow: string) {
    this.setState({ categoryToShow });
  }

  renderCategories() {
    
    const catElements = this.state.categories.map((cat, index) => {
      let selected = this.state.categoryToShow === cat ? true : false;
      return Category(index, this.changeCategoryToShow, selected, cat);
    });
    return catElements;
  }

  filterRecipesByCat() {
    let recipesByCat: Recipe[] = [];
    if (this.state.categoryToShow === "ALL") {
      recipesByCat = recipeData;
    } else {
      recipesByCat = recipeData.filter(
        (r) => r.category === this.state.categoryToShow
      );
    }
    return recipesByCat;
  }

  renderPublicRecipes() {
    const allRecipes = this.filterRecipesByCat().map((recipeData, index) => {
      const { recipeId, name, createdBy } = recipeData;
      const RCProps = {
        name,
        recipeId,
        index,
        view: "public",
        uid: this.props.match.params.id,
        createdBy,
      };
      return <RecipeCard key={index} {...RCProps} />;
    });
    return handleRecipeArrayLength(allRecipes);
  }

  renderUserRecipes(recipesToShow: string) {
    const recipesByCat = this.filterRecipesByCat();
    let recipes: Recipe[] = [];
    const uid = this.props.match.params.id;
    const user = userData.filter((u) => u.uid === uid)
    if(user.length) {

      const userFavs = user[0].favorites;
      if (recipesToShow === "PERSONAL RECIPES") {
      recipes = recipesByCat.filter(
        (r) => r.createdBy === this.props.match.params.id
        );
      } else if (recipesToShow === "FAVORITE RECIPES") {
        for (let x = 0; x < userFavs.length; x++) {
          for (let y = 0; y < recipesByCat.length; y++) {
            if (recipesByCat[y].recipeId === userFavs[x]) {
              recipes.push(recipesByCat[y]);
            }
          }
        }
      }
      const userRecipes = recipes.map((recipeData, index) => {
        const { recipeId, name, createdBy } = recipeData;
        const RCProps = {
          name,
          recipeId,
          index,
          view: "user",
          uid: this.props.match.params.id,
          createdBy,
        };
        return <RecipeCard key={index} {...RCProps} />;
      });
      return handleRecipeArrayLength(userRecipes);
    } else {
      return "NO FAVORITES YET"
    }
  }

  handleRecipes() {
    const { recipesToShow } = this.state;
    if (recipesToShow === "ALL RECIPES") {
      return this.renderPublicRecipes();
    } else {
      return this.renderUserRecipes(recipesToShow);
    }
  }

  handleRViewSelector(type: string) {
    return (
      <RViewSelector
        onClick={() => this.setState({ recipesToShow: type })}
        bgColor={this.state.recipesToShow === type ? accentColorOne : null}
        textColor={this.state.recipesToShow === type ? primaryColorTwo : null}
      >
        {type}
      </RViewSelector>
    );
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

  componentDidMount() {
    const state = {...this.state}
    const categories = state.categories
    for (let x = 0; x < recipeData.length; x++) {
      let cat = recipeData[x].category;
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }
    this.setState({ categories })
  }

  render() {
    return (
      <div id="PublicPage">
        <CategoriesContainer>
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
        </CategoriesContainer>
        <Recipes id="Recipes">
          {this.props.match.params.id ? (
            <>
              <RVSCont>
                {this.handleRViewSelector("ALL RECIPES")}
                {this.handleRViewSelector("FAVORITE RECIPES")}
                {this.handleRViewSelector("PERSONAL RECIPES")}
              </RVSCont>
              <SectionContainer>{this.handleRecipes()}</SectionContainer>
            </>
          ) : (
            this.renderPublicRecipes()
          )}
        </Recipes>
      </div>
    );
  }
}

export default withRouter(AllRecipesPage);

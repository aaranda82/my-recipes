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
const { secondaryFont, mobileMaxWidth } = Styles;

const PublicPageDiv = styled.div`
  width: 95%;
  margin: auto;
  display: flex;
  @media (max-width: ${mobileMaxWidth}) {
    width: 100%;
  }
`;
const Categories = styled.div`
  min-width: 110px;
  width: 15%;
  justify-content: space-around;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  }
`;

const CatTitle = styled.div`
  font-family: ${secondaryFont};
  font-size: 30px;
  margin-top: 15px;
  color: ${gunmetal};
  width: 100%;
  text-align: center;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  }
`;

const RVSCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  margin-top: 10px;
  cursor: pointer;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 10px;
  } ;
`;

const SectionContainer = styled.div`
  width: 100%;
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
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${mobileMaxWidth}) {
    width: 100%;
  }
`;

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
      categoryToShow: "ALL",
      recipesToShow: "ALL RECIPES",
    };
    this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(categoryToShow: string) {
    this.setState({ categoryToShow });
  }

  renderCategories() {
    const categories: string[] = ["ALL"];
    for (let x = 0; x < recipeData.length; x++) {
      let cat = recipeData[x].category;
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }
    const catElements = categories.map((cat, index) => {
      let selected = this.state.categoryToShow === cat ? true : false;
      return Category(index, this.changeCategory, selected, cat);
    });
    return catElements;
  }

  handleRecipeArrayLength(allRecipes: JSX.Element[]) {
    if (window.screen.width < 500) {
      return allRecipes;
    } else {
      if (allRecipes.length === 4 || allRecipes.length % 4 === 0) {
        return false;
      } else if (allRecipes.length > 4 && allRecipes.length % 4 !== 0) {
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
      return RecipeCard(
        name,
        recipeId,
        createdBy,
        index,
        "public",
        this.props.match.params.id
      );
    });
    return this.handleRecipeArrayLength(allRecipes);
  }

  renderUserRecipes(t: string) {
    const recipesByCat = this.filterRecipesByCat();
    let recipes: Recipe[] = [];
    const uid = this.props.match.params.id;
    const user = userData.filter((u) => u.uid === uid);
    const userFavs = user[0].favorites;
    if (t === "PERSONAL RECIPES") {
      recipes = recipesByCat.filter(
        (r) => r.createdBy === this.props.match.params.id
      );
    } else if (t === "FAVORITE RECIPES") {
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
      return RecipeCard(
        name,
        recipeId,
        createdBy,
        index,
        "user",
        this.props.match.params.id
      );
    });
    return this.handleRecipeArrayLength(userRecipes);
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

  render() {
    return (
      <PublicPageDiv id="PublicPage">
        <Categories id="Categories">
          <CatTitle>Categories</CatTitle>
          {this.renderCategories()}
        </Categories>
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
      </PublicPageDiv>
    );
  }
}

export default withRouter(AllRecipesPage);

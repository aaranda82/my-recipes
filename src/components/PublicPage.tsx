import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import recipeData from "../data-recipes.json";
import RecipeCard, { BlankRecipeCard } from "./RecipeCard";
import Category from "./Category";
import { withRouter, RouteComponentProps } from "react-router";
import Spacer from "./Spacer";
const { gunmetal, blueMunsell, snow } = ColorScheme;

const PublicPageDiv = styled.div`
  width: 95%;
  margin: auto;
  display: flex;
`;

const Categories = styled.div`
  min-width: 110px;
  width: 15%;
  justify-content: space-around;
  @media (max-width: 500px) {
    display: none;
  }
`;

const CatTitle = styled.div`
  font-family: "Quattrocento", serif;
  font-size: 25px;
  margin: 50px 0 15px 0;
  color: ${gunmetal};
  width: 100%;
  text-align: center;
  @media (max-width: 500px) {
    display: none;
  }
`;

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
  background-color: ${snow};
`;

const SectionTitle = styled.div`
  width: 98%;
  text-align: center;
  font-family: "Quattrocento", serif;
  font-size: 25px;
  color: ${gunmetal};
  @media (max-width: 875px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    width: 96%;
  }
`;

const Recipes = styled.div`
  margin-top: 20px;
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

interface IState {
  categoryToShow: string;
  showCreated: boolean;
  showFavorites: boolean;
}

class PublicPage extends Component<
  RouteComponentProps<{ id: string }>,
  IState
> {
  constructor(props: RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      categoryToShow: "ALL",
      showCreated: false,
      showFavorites: false,
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
      let color = this.state.categoryToShow === cat ? blueMunsell : undefined;
      return Category(index, this.changeCategory, color, cat);
    });
    return catElements;
  }

  handlePublicRecipes(p?: string) {
    let recipesByCat: {
      recipeId: number;
      createdBy: string;
      recipe: string;
      category: string;
      servings: number;
      ingredients: { name: string; quantity: number; unit: string }[];
      instructions: { number: number; instruction: string }[];
    }[] = [];
    if (this.state.categoryToShow === "ALL") {
      recipesByCat = recipeData;
      if (p === "created") {
        recipesByCat = recipeData.filter(
          (r) => r.createdBy === this.props.match.params.id
        );
      }
      // if props === "favorites" then filter out recipes by favorites
    } else {
      recipesByCat = recipeData.filter(
        (r) => r.category === this.state.categoryToShow
      );
    }

    const allRecipes = recipesByCat.map((recipeData, index) => {
      const { recipeId, recipe, createdBy } = recipeData;
      return RecipeCard(recipe, recipeId, createdBy, index, "public");
    });

    if (allRecipes.length === 4 || allRecipes.length % 4 === 0) {
      console.log("is divisible by 4");
      return false;
    } else if (allRecipes.length > 4 && allRecipes.length % 4 !== 0) {
      console.log("greater than 4");
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length % 4 !== 0);
    } else if (allRecipes.length < 4) {
      console.log("less than 4");
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length <= 3);
      console.log(p, allRecipes);
    }

    return allRecipes;
  }

  handleUserRecipes() {
    return (
      <>
        <SectionContainer>
          <SectionTitle>Created</SectionTitle>
          <i
            className={
              this.state.showCreated
                ? "fas fa-chevron-up"
                : "fas fa-chevron-down"
            }
            onClick={() =>
              this.setState({ showCreated: !this.state.showCreated })
            }
            style={{ transition: "all ease 0.5s" }}
          />
          {this.state.showCreated ? this.handlePublicRecipes("created") : null}
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Favorites</SectionTitle>
          <i className="fas fa-chevron-down" />
        </SectionContainer>
      </>
    );
  }

  render() {
    return (
      <PublicPageDiv id="PublicPage">
        <Categories id="Categories">
          <CatTitle>Categories</CatTitle>
          <Spacer />
          {this.renderCategories()}
        </Categories>
        <Recipes id="Recipes">
          {this.props.match.params.id ? this.handleUserRecipes() : null}
          <SectionContainer>
            <SectionTitle>All Recipes</SectionTitle>
            {this.handlePublicRecipes()}
          </SectionContainer>
        </Recipes>
      </PublicPageDiv>
    );
  }
}

export default withRouter(PublicPage);

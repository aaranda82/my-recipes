import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import recipeData from "../data-recipes.json";
import RecipeCard, { BlankRecipeCard } from "./RecipeCard";
import Category from "./Category";
import { withRouter, RouteComponentProps } from "react-router";
const { gunmetal, blueMunsell } = ColorScheme;

const PublicPageDiv = styled.div`
  width: 95%;
  margin: auto;
  display: flex;
  & .title {
    font-family: "Quattrocento", serif;
    font-size: 25px;
    margin: 50px 0 15px 0;
    color: ${gunmetal};
  }
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
  width: 100%;
  border-bottom: 1px solid black;
  @media (max-width: 500px) {
    display: none;
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
}

class PublicPage extends Component<
  RouteComponentProps<{ id: string }>,
  IState
> {
  constructor(props: RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      categoryToShow: "ALL",
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

  handlePublicRecipes() {
    let recipesByCat: {
      recipeId: number;
      recipe: string;
      category: string;
      servings: number;
      ingredients: { name: string; quantity: number; unit: string }[];
      instructions: { number: number; instruction: string }[];
    }[] = [];
    if (this.state.categoryToShow === "ALL") {
      recipesByCat = recipeData;
    } else {
      recipesByCat = recipeData.filter(
        (r) => r.category === this.state.categoryToShow
      );
    }
    const allRecipes = recipesByCat.map((recipeData, index) => {
      const { recipeId, recipe } = recipeData;
      return RecipeCard(recipe, recipeId, index, "public");
    });
    if (allRecipes.length < 4) {
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length <= 5);
    }
    if (allRecipes.length > 4 && allRecipes.length % 4 !== 0) {
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length % 4 !== 0);
    }
    return allRecipes;
  }

  handleUserRecipes() {
    return (
      <>
        <div>Created</div>
        <div>Favorites</div>
      </>
    );
  }

  render() {
    return (
      <PublicPageDiv id="PublicPage">
        <Categories id="Categories">
          <CatTitle className="title">Categories</CatTitle>
          {this.renderCategories()}
        </Categories>
        <Recipes id="Recipes">
          {this.props.match.params.id
            ? this.handleUserRecipes()
            : this.handlePublicRecipes()}
        </Recipes>
      </PublicPageDiv>
    );
  }
}

export default withRouter(PublicPage);

import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import recipeData from "../data-recipes.json";
import userData from "../data-users.json";
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

interface Recipe {
  recipeId: number;
  createdBy: string;
  recipe: string;
  category: string;
  servings: number;
  ingredients: { name: string; quantity: number; unit: string }[];
  instructions: { number: number; instruction: string }[];
}

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

  handleRecipeArrayLength(allRecipes: JSX.Element[]) {
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

  handlePublicRecipes() {
    const allRecipes = this.filterRecipesByCat().map((recipeData, index) => {
      const { recipeId, recipe, createdBy } = recipeData;
      return RecipeCard(recipe, recipeId, createdBy, index, "public");
    });

    return this.handleRecipeArrayLength(allRecipes);
  }

  renderUserRecipes(t: string) {
    const recipesByCat = this.filterRecipesByCat();
    let recipes: Recipe[] = [];
    if (t === "created") {
      recipes = recipesByCat.filter(
        (r) => r.createdBy === this.props.match.params.id
      );
    } else if (t === "favorites") {
      const user = userData.filter((u) => u.uid === this.props.match.params.id);
      const userFavs = user[0].favorites;
      for (let x = 0; x < userFavs.length; x++) {
        for (let y = 0; y < recipesByCat.length; y++) {
          if (recipesByCat[y].recipeId === userFavs[x]) {
            recipes.push(recipesByCat[y]);
          }
        }
      }
    }
    const userRecipes = recipes.map((recipeData, index) => {
      const { recipeId, recipe, createdBy } = recipeData;
      return RecipeCard(recipe, recipeId, createdBy, index, "user");
    });
    return this.handleRecipeArrayLength(userRecipes);
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
          {this.state.showCreated ? this.renderUserRecipes("created") : null}
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Favorites</SectionTitle>
          <i
            className={
              this.state.showFavorites
                ? "fas fa-chevron-up"
                : "fas fa-chevron-down"
            }
            onClick={() =>
              this.setState({ showFavorites: !this.state.showFavorites })
            }
            style={{ transition: "all ease 0.5s" }}
          />
          {this.state.showFavorites
            ? this.renderUserRecipes("favorites")
            : null}
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

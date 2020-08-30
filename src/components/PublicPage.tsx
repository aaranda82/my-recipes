import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import data from "../data.json";
import Lunch from "../assets/Lunch.jpg";
import { Link } from "react-router-dom";

const { gunmetal, timberwolf, blueMunsell } = ColorScheme;

const PublicPageDiv = styled.div`
  width: 95%;
  margin: auto;
  display: flex;
  & .title {
    font-family: "Quattrocento", serif;
    font-size: 3em;
    margin: 50px 0 15px 0;
    color: ${gunmetal};
  }
`;

const Categories = styled.div`
  width: 20%;
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

const Category = styled.a`
  margin: 0 20px;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
`;

const Recipes = styled.div`
  margin-top: 20px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
`;

const Recipe = styled.div`
  cursor: pointer;
  text-align: center;
  width: 20%;
  height: fit-content;
  margin: 10px;
  background-color: ${timberwolf};
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const RecipeImage = styled.img`
  height: auto;
  width: 100%;
  background-image: url(${Lunch});
  background-size: cover;
  background-position: center;
`;

const RecipeName = styled.div`
  font-weight: 600;
  margin: 5px;
`;

interface IState {
  categoryToShow: string;
}

class PublicPage extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      categoryToShow: "ALL",
    };
  }

  changeCategory(categoryToShow: string) {
    this.setState({ categoryToShow });
  }

  renderCategories() {
    const categories: string[] = ["ALL"];
    for (let x = 0; x < data.length; x++) {
      let cat = data[x].category;
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }
    const catElements = categories.map((cat, index) => {
      let color = this.state.categoryToShow === cat ? blueMunsell : undefined;
      return (
        <Category
          id="category"
          key={index}
          onClick={() => this.changeCategory(cat)}
        >
          <div style={{ color: color }}>{cat}</div>
        </Category>
      );
    });
    return catElements;
  }

  handleRecipe() {
    let recipesByCat: {
      recipeId: number;
      recipe: string;
      category: string;
      servings: number;
      ingredients: { name: string; quantity: number; unit: string }[];
      instructions: { number: number; instruction: string }[];
    }[] = [];
    if (this.state.categoryToShow === "ALL") {
      recipesByCat = data;
    } else {
      recipesByCat = data.filter(
        (r) => r.category === this.state.categoryToShow
      );
    }
    const allRecipes = recipesByCat.map((recipeData, index) => {
      const { recipeId, recipe } = recipeData;
      return (
        <Recipe key={index}>
          <Link
            to={`/recipedetail/:${recipeId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <RecipeImage src={Lunch} alt="Lunch" />
            <RecipeName>{recipe}</RecipeName>
          </Link>
        </Recipe>
      );
    });
    return allRecipes;
  }

  render() {
    return (
      <PublicPageDiv id="PublicPage">
        <Categories id="Categories">
          <CatTitle className="title">Categories</CatTitle>
          {this.renderCategories()}
        </Categories>
        <Recipes id="Recipes">{this.handleRecipe()}</Recipes>
      </PublicPageDiv>
    );
  }
}

export default PublicPage;

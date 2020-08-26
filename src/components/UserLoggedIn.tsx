import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import data from "../data.json";
import { RootState } from "../reducers/rootReducer";
import { loadRecipesAction } from "../actions/userRecipeAction";
import RecipeDetail from "./RecipeDetail";
import Lunch from "../assets/Lunch.jpg";
const { connect } = require("react-redux");

const { gunmetal, timberwolf } = ColorScheme;

const UserPage = styled.div`
  width: 80%;
  padding: 99px 0 0;
  & .title {
    font-family: "Quattrocento", serif;
    font-size: 3em;
    margin: 50px 0 15px 0;
    color: ${gunmetal};
  }
`;
const Categories = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 500px) {
    display: none;
  }
`;

const CatTitle = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

const Category = styled.div`
  width: 18%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.5em;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
`;

const CategoryImage = styled.div`
  width: 100%;
  padding-bottom: 40%;
  background-color: ${timberwolf};
`;

const Recipes = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Recipe = styled.div`
  cursor: pointer;
  text-align: center;
  width: 20%;
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
  margin: 5px 0;
`;

const RecipeCategory = styled.div``;

interface UserLoggedInProps {
  recipes: RootState["userRecipeReducer"];
  loadRecipes: (r: RootState["userRecipeReducer"]) => void;
}
class UserLoggedIn extends Component<
  UserLoggedInProps,
  {
    recipe: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: { number: number; instruction: string }[];
  }
> {
  constructor(props: UserLoggedInProps) {
    super(props);
    this.state = {
      recipe: "",
      category: "",
      servings: 0,
      ingredients: [],
      instructions: [],
    };
    this.clearRecipeState = this.clearRecipeState.bind(this);
  }
  handleCategory() {
    const categories: string[] = [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "All Categories",
    ];
    const catElements = categories.map((cat, index) => {
      return (
        <Category key={index}>
          <CategoryImage className="categoryImage"></CategoryImage>
          {cat}
        </Category>
      );
    });
    return catElements;
  }

  handleRecipe() {
    const allRecipes = this.props.recipes.map((recipeData, index) => {
      const {
        recipe,
        category,
        ingredients,
        instructions,
        servings,
      } = recipeData;
      return (
        <Recipe
          key={index}
          onClick={() => {
            this.setState({
              recipe,
              category,
              ingredients,
              instructions,
              servings,
            });
          }}
        >
          <RecipeImage src={Lunch} alt="Lunch" />
          <RecipeName>{recipe}</RecipeName>
          <RecipeCategory>{category}</RecipeCategory>
        </Recipe>
      );
    });
    return allRecipes;
  }

  componentDidMount() {
    this.props.loadRecipes(data);
  }

  clearRecipeState() {
    this.setState({ recipe: "" });
  }

  handleRender() {
    if (this.state.recipe) {
      return <RecipeDetail c={this.clearRecipeState} recipe={this.state} />;
    } else {
      return (
        <UserPage id="UserPage">
          <CatTitle className="title">Categories</CatTitle>
          <Categories id="Categories">{this.handleCategory()}</Categories>
          <div className="title">Recipes</div>
          <Recipes id="Recipes">{this.handleRecipe()}</Recipes>
        </UserPage>
      );
    }
  }

  render() {
    return this.handleRender();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    recipes: state.userRecipeReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadRecipes: (recipes: RootState["userRecipeReducer"]) => {
      dispatch(loadRecipesAction(recipes));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoggedIn);

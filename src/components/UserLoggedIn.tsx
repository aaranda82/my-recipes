import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import data from "../data.json";
import { RootState } from "../reducers/rootReducer";
import { loadRecipesAction } from "../actions/userRecipeAction";
const { connect } = require("react-redux");

const { gunmetal, bittersweet, ivory, timberwolf } = ColorScheme;

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

const Image = styled.div`
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
  background-color: ${ivory};
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
`;

const RecipeImage = styled.div`
  height: 200px;
  background-color: ${bittersweet};
`;

interface UserLoggedInProps {
  recipes: RootState["userRecipeReducer"];
  loadRecipes: (r: RootState["userRecipeReducer"]) => void;
}
class UserLoggedIn extends Component<UserLoggedInProps> {
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
          <Image className="image"></Image>
          {cat}
        </Category>
      );
    });
    return catElements;
  }

  handleRecipe() {
    const allRecipes = this.props.recipes.map((recipeData, index) => {
      const { recipe, category } = recipeData;
      return (
        <Recipe key={index}>
          <RecipeImage>Recipe Image</RecipeImage>
          <h4>{recipe}</h4>
          <p>{category}</p>
        </Recipe>
      );
    });
    return allRecipes;
  }

  componentDidMount() {
    this.props.loadRecipes(data);
  }

  render() {
    return (
      <UserPage id="UserPage">
        <div className="title">Categories</div>
        <Categories id="Categories">{this.handleCategory()}</Categories>
        <div className="title">Recipes</div>
        <Recipes id="Recipes">{this.handleRecipe()}</Recipes>
      </UserPage>
    );
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

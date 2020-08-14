import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Breakfast from "../assets/Breakfast.jpg";
import Lunch from "../assets/Lunch.jpg";
import Dinner from "../assets/Dinner.jpg";
import Dessert from "../assets/Dessert.jpg";
import data from "../data.json";
import { RootState } from "../reducers/rootReducer";
import { loadRecipesAction } from "../actions/userRecipeAction";
const { connect } = require("react-redux");

const { gunmetal, bittersweet, ivory } = ColorScheme;

const UserPage = styled.div`
  width: 80%;
  & .title {
    font-family: "Quattrocento", serif;
    font-size: 3em;
    margin: 50px 0 15px 0;
    color: ${gunmetal};
  }
`;
const Categories = styled.div`
  display: flex;
  justify-content: center;
`;

const Category = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.5em;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
`;

interface ImageProps {
  image: string;
}

const Image = styled.div<ImageProps>`
  width: 80%;
  padding-bottom: 40%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const Recipes = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Recipe = styled.div`
  border: 1px solid gold;
  text-align: center;
  width: 20%;
  margin: 10px;
  box-shadow: 10px 5px 5px ${gunmetal};
  background-color: ${ivory};
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.2);
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
  handleCategory(category: string, image: string) {
    return (
      <Category>
        <Image image={image} className="image"></Image>
        {category}
      </Category>
    );
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
        <Categories id="Categories">
          {this.handleCategory("Breakfast", Breakfast)}
          {this.handleCategory("Lunch", Lunch)}
          {this.handleCategory("Dinner", Dinner)}
          {this.handleCategory("Dessert", Dessert)}
          {this.handleCategory("All Categories", Dessert)}
        </Categories>
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

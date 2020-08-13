import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Breakfast from "../assets/Breakfast.jpg";
import Lunch from "../assets/Lunch.jpg";
import Dinner from "../assets/Dinner.jpg";
import Dessert from "../assets/Dessert.jpg";

const { gunmetal } = ColorScheme;

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
  justify-content: center;
`;

const Recipe = styled.div`
  border: 1px solid gold;
  flex: 1;
  text-align: center;
`;

class UserLoggedIn extends Component {
  handleCategory(category: string, image: string) {
    return (
      <Category>
        <Image image={image} className="image"></Image>
        {category}
      </Category>
    );
  }

  handleRecipe() {
    return (
      <Recipe>
        <div>Recipe Image</div>
        <div>Recipe</div>
      </Recipe>
    );
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
        <Recipes id="Recipes">
          {this.handleRecipe()}
          {this.handleRecipe()}
        </Recipes>
      </UserPage>
    );
  }
}

export default UserLoggedIn;

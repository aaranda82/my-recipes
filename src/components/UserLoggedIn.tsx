import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

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
`;

const Image = styled.div`
  width: 80%;
  height: 150px;
  background-color: ${gunmetal};
  border-radius: 50%;
`;

const Recipes = styled.div`
  border: 1px solid black;
`;

class UserLoggedIn extends Component {
  handleCategory(category: string) {
    return (
      <>
        <Category>
          <Image></Image>
          {category}
        </Category>
      </>
    );
  }

  render() {
    return (
      <UserPage>
        <div className="title">Categories</div>
        <Categories>
          {this.handleCategory("Breakfast")}
          {this.handleCategory("Lunch")}
          {this.handleCategory("Dinner")}
          {this.handleCategory("Dessert")}
          {this.handleCategory("All Categories")}
        </Categories>
        <div className="title">Recipes</div>
        <Recipes></Recipes>
      </UserPage>
    );
  }
}

export default UserLoggedIn;

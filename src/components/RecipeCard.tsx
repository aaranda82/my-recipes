import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import Lunch from "../assets/Lunch.jpg";
import AuthModal from "./AuthModal"
import SaveButton from "./SaveButton";

const { primaryColorTwo } = ColorScheme;
const { mobileMaxWidth, primaryFont } = Styles;

const RContainer = styled.div`
  flex: 1 1 22%;
  margin: 10px;
  background-color: ${primaryColorTwo};
  height: auto;
  border: 1px solid lightgrey;
  @media screen and (max-width: 875px) {
    flex: 1 1 20%;
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
    display: flex;
    width: 90%;
    flex: none;
    margin: 0 0 10px 0;
  }
`;

const RImage = styled.img`
  height: auto;
  width: 100%;
  background-image: url(${Lunch});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 40%;
  }
`;

const RInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-family: ${primaryFont};
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 60%;
  }
`;

interface RNProps {
  view: string;
}

const RName = styled.div<RNProps>`
  width: 100%;
  margin: ${(props) => (props.view !== "public" ? "20px 0" : "10px 0")};
  text-align: center;
  cursor: pointer;
`;


interface RCProps {
  name: string;
  recipeId: number;
  index: number;
  view: string;
  uid: string;
}

class RecipeCard extends Component<RCProps, { showAuth: boolean }> {
  constructor(props: RCProps) {
    super(props);
    this.state = { showAuth: false };
    this.toggleAuthView = this.toggleAuthView.bind(this);
  }

  toggleAuthView() {
    this.setState({ showAuth: !this.state.showAuth });
  }

  render() {
    const { name, recipeId, index, view, uid } = this.props;
    return (
      <>
        {AuthModal(this.state.showAuth, this.toggleAuthView, uid)}
        <RContainer id="RecipeCard" key={index}>
          <RImage src={Lunch} alt="Lunch" />
          <RInfoContainer>
            <RName view={view}>
              <Link
                to={`/recipedetail/:${recipeId}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {name}
              </Link>
            </RName>
            {SaveButton(uid, this.toggleAuthView, recipeId)}
          </RInfoContainer>
        </RContainer>
      </>
    );
  }
}

export function BlankRecipeCard(index: number) {
  return (
    <RContainer
      key={index}
      style={{
        visibility: "hidden",
        transition: "none",
      }}
    >
      <RImage src={Lunch} alt="Lunch" />
      <RName view="blank"></RName>
    </RContainer>
  );
}

export default RecipeCard;

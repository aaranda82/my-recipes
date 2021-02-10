import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { clearAction } from "../actions/authActions";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";

const { primaryColorOne, primaryColorTwo } = colorScheme;

const AddRecipeBtn = styled.button`
  font-family: "Raleway", sans-serif;
  background-color: ${primaryColorTwo};
  padding: 10px 20px;
  outline: none;
  color: ${primaryColorOne};
  border: 1px solid;
  border-radius: 10px;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    transform: scale(1.2);
  }
  & > a {
    text-decoration: none;
    color: ${primaryColorOne};
  }
  @media screen and (max-width: ${styles.mobileMaxWidth}) {
    font-size: 10px;
  }
`;

const AddRecipeButton = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  return location.pathname === "/createrecipe" ? null : (
    <Link to="/createrecipe">
      <AddRecipeBtn onClick={() => dispatch(clearAction())}>
        ADD RECIPE
      </AddRecipeBtn>
    </Link>
  );
};

export default AddRecipeButton;

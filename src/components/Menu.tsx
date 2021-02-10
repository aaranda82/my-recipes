import firebase from "firebase";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearAction } from "../actions/authActions";
import { signOutAction } from "../actions/userActions";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";
import AddRecipeButton from "./AddRecipeButton";
import { LogInButton, SignUpButton } from "./AuthButtons";

const {
  primaryColorTwo,
  primaryColorOne,
  accentColorOne,
  gunmetal,
} = colorScheme;

const { mobileMaxWidth, secondaryFont } = styles;

interface MProps {
  showMenu: boolean;
  loggedIn: boolean;
}

const MContainer = styled.div<MProps>`
  width: 25vw;
  height: 100vh;
  font-size: 2em;
  font-family: ${secondaryFont};
  font-weight: 600;
  color: ${primaryColorOne};
  position: absolute;
  top: 55px;
  left: ${(props) => (props.showMenu ? "75vw" : "100vw")};
  padding-top: 20px;
  background: ${primaryColorTwo};
  border: 1px solid ${gunmetal};
  transition: all ease 0.5s;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 50vw;
    left: ${(props) => (props.showMenu ? "50vw" : "100vw")};
    top: ${(props) => (props.loggedIn ? "44px" : "64px")};
  }
  & > div {
    cursor: pointer;
    transition: all 1s ease;
  }
  & > div:hover {
    color: ${accentColorOne};
  }
`;

const AddRecipeContainer = styled.div`
  display: none;
  @media screen and (max-width: ${mobileMaxWidth}) {
    display: flex;
    justify-content: center;

    width: 100%;
  }
`;

const Menu = (): ReactElement => {
  const dispatch = useDispatch();
  const { showMenu } = useSelector((state: RootState) => state.authReducer);
  const { uid, displayName } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const handleSignOut = () => {
    dispatch(clearAction());
    dispatch(signOutAction());
    firebase.auth().signOut();
  };

  const handleMenuItems = (to: string, name: string) => {
    return (
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: primaryColorOne,
          width: "100%",
          textAlign: "center",
        }}>
        <div
          onClick={() =>
            name === "SIGN OUT" ? handleSignOut() : dispatch(clearAction())
          }>
          {name}
        </div>
      </Link>
    );
  };

  return displayName ? (
    <>
      <MContainer showMenu={showMenu} loggedIn={!!displayName}>
        <AddRecipeContainer>
          <AddRecipeButton />
        </AddRecipeContainer>
        {handleMenuItems(`/user/${uid}`, displayName)}
        {handleMenuItems(`/userpage/${uid}`, "HOME")}
        {handleMenuItems("/account", "ACCOUNT")}
        {handleMenuItems("/", "SIGN OUT")}
      </MContainer>
    </>
  ) : (
    <MContainer showMenu={showMenu} loggedIn={!!displayName}>
      <LogInButton />
      <SignUpButton />
    </MContainer>
  );
};

export default Menu;

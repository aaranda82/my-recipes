import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearAction, showMenuAction } from "../actions/authActions";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";
import AddRecipeButton from "./AddRecipeButton";
import { LogInButton, SignUpButton } from "./AuthButtons";
import SearchFilter from "./SearchFilter";
import { Spacer } from "./Spacer";

const { primaryColorOne, primaryColorTwo } = colorScheme;
const { mobileMaxWidth } = styles;

const NavContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: ${mobileMaxWidth}) {
    width: 15%;
  } ;
`;

const DesktopContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  } ;
`;

const MobileContainer = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  @media screen and (max-width: ${mobileMaxWidth}) {
    display: block;
  }
`;

const NavMenuButton = styled.i<{ loggedIn: boolean }>`
  font-size: 2em;
  color: ${(props) => (props.loggedIn ? primaryColorTwo : primaryColorOne)};
  &:hover {
    opacity: 0.6;
  }
`;

const HeaderButtons = (): ReactElement => {
  const dispatch = useDispatch();
  const { showMenu } = useSelector((state: RootState) => state.authReducer);
  const { displayName } = useSelector((state: RootState) => state.userReducer);

  const handleNavMenuButton = () => {
    return (
      <NavMenuButton
        loggedIn={!!displayName}
        className={showMenu ? "fas fa-times" : "fas fa-bars"}
        onClick={() =>
          showMenu ? dispatch(clearAction()) : dispatch(showMenuAction())
        }
      />
    );
  };

  return displayName ? (
    <>
      <DesktopContainer>
        <SearchFilter />
        <AddRecipeButton />
      </DesktopContainer>
      <NavContainer id="nav menu button">{handleNavMenuButton()}</NavContainer>
    </>
  ) : (
    <>
      <DesktopContainer>
        <SearchFilter />
        <SignUpButton />
        <LogInButton />
      </DesktopContainer>
      <MobileContainer>{handleNavMenuButton()}</MobileContainer>
      <Spacer />
    </>
  );
};

export default HeaderButtons;

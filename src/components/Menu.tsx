import firebase from "firebase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearAction } from "../actions/authActions";
import { signOutAction } from "../actions/userActions";
import { colorScheme } from "../colorScheme";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

const {
  primaryColorTwo,
  primaryColorOne,
  accentColorOne,
  gunmetal,
} = colorScheme;

interface MProps {
  showMenu: boolean;
}

const MContainer = styled.div<MProps>`
  font-size: 2em;
  font-family: ${styles.secondaryFont};
  font-weight: 600;
  color: ${primaryColorOne};
  position: absolute;
  top: 55px;
  right: ${(props) => (props.showMenu ? "0" : "-315px")};
  padding: 20px 70px 20px 70px;
  background: ${primaryColorTwo};
  border: 1px solid ${gunmetal};
  transition: all ease 0.5s;
  & > div {
    margin: 40px;
    cursor: pointer;
    transition: all 1s ease;
  }
  & > div:hover {
    color: ${accentColorOne};
  }
`;

const Menu = () => {
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
      <Link to={to} style={{ textDecoration: "none", color: primaryColorOne }}>
        <div
          onClick={() =>
            name === "SIGN OUT" ? handleSignOut() : dispatch(clearAction())
          }>
          {name}
        </div>
      </Link>
    );
  };

  return (
    <>
      <MContainer showMenu={showMenu}>
        {handleMenuItems(`/user/${uid}`, displayName)}
        {handleMenuItems(`/userpage/${uid}`, "HOME")}
        {handleMenuItems("/account", "ACCOUNT")}
        {handleMenuItems("/", "SIGN OUT")}
      </MContainer>
    </>
  );
};

export default Menu;

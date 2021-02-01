import firebase from "firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAction } from "../actions/authActions";
import { signInAction } from "../actions/userActions";
import { RootState } from "../reducers/rootReducer";

export const useSignUp = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersReducer.users);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const validateInputs = () => {
    let isValid = true;

    if (userName.length < 3) {
      setUserNameError("Must be at least 3 letters");
      isValid = false;
    } else if (
      Object.values(users)
        .map((u) => u.userName)
        .includes(userName)
    ) {
      setUserNameError("User Name Taken");
      isValid = false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email");
      isValid = false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      setPasswordError("Invlaid Password");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    setUserNameError("");
  }, [userName, setUserNameError]);

  useEffect(() => {
    setEmailError("");
  }, [email, setEmailError]);

  useEffect(() => {
    setPasswordError("");
  }, [password, setPasswordError]);

  useEffect(() => {
    setConfirmPasswordError("");
  }, [confirmPassword, setConfirmPasswordError]);

  const submitNewUser = () => {
    const isValid = validateInputs();
    if (isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (user) {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                user.updateProfile({
                  displayName: userName,
                });
              }
            });
            if (user.user && typeof user.user.email === "string") {
              const { email, uid } = user.user;
              dispatch(signInAction(userName, email, uid));
              firebase
                .database()
                .ref("users/" + uid)
                .set({
                  email,
                  userName,
                });
              dispatch(clearAction());
            }
          }
        })
        .catch((error) => console.log("Error creating user: ", error));
    }
  };
  return {
    inputs: {
      userName,
      password,
      email,
      confirmPassword,
    },
    errors: {
      userNameError,
      passwordError,
      confirmPasswordError,
      emailError,
    },
    setInputs: {
      setUserName,
      setPassword,
      setEmail,
      setConfirmPassword,
    },
    submit: submitNewUser,
  };
};

import firebase from "firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { RootState } from "../reducers/rootReducer";

export const useCreateRecipe = () => {
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/my-recipes-da233.appspot.com/o/fr9urcWIV8V2IXoWgBTwMLIgVW02%2FToast-1612819853305?alt=media&token=8346302d-aeb6-4ca8-a3df-163d262657d5";
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [servings, setServings] = useState(0);
  const [image, setImage] = useState<Blob | Uint8Array | ArrayBuffer | null>(
    null,
  );
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [imageToUpdate, setImageToUpdate] = useState("");

  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const db = firebase.database();
  const storageRef = firebase
    .storage()
    .ref()
    .child(`${uid}/${recipeName}-${Date.now()}`);

  const submitNewRecipe = () => {
    if (imagePreview === defaultImage) {
      const key = db.ref().child("recipes").push().key;
      const recipe = {
        createdBy: uid,
        name: recipeName,
        description,
        category,
        servings,
        ingredients,
        instructions,
        image: imagePreview,
      };
      db.ref(`recipes/${key}`).set(recipe);
      history.push(`/user/${uid}`);
    } else if (image) {
      const task = storageRef.put(image);
      task.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const key = db.ref().child("recipes").push().key;
            const recipe = {
              createdBy: uid,
              name: recipeName,
              description,
              category,
              servings,
              ingredients,
              instructions,
              image: downloadURL,
            };
            db.ref(`recipes/${key}`).set(recipe);
            history.push(`/user/${uid}`);
          });
        },
      );
    }
  };

  const editRecipe = () => {
    if (image) {
      const task = storageRef.put(image);
      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const recipe = {
              createdBy: uid,
              name: recipeName,
              description,
              category,
              servings,
              ingredients,
              instructions,
              image: downloadURL,
            };
            db.ref(`recipes/${id}`).set(recipe);
            history.push(`/recipedetail/${id}`);
          });
        },
      );
      return null;
    }
    const recipe = {
      createdBy: uid,
      name: recipeName,
      description,
      category,
      servings,
      ingredients,
      instructions,
    };
    db.ref("recipes/").child(id).update(recipe);
    history.push(`/recipedetail/${id}`);
  };

  useEffect(() => {
    if (recipes && location.pathname === `/editrecipe/${id}`) {
      const {
        name,
        description,
        ingredients,
        instructions,
        servings,
        category,
        image,
      } = recipes[id];
      setRecipeName(name);
      setDescription(description);
      setIngredients(ingredients);
      setInstructions(instructions);
      setServings(servings);
      setCategory(category);
      setImageToUpdate(image);
    }
  }, [id, location.pathname, recipes]);

  useEffect(() => {
    if (!uid) {
      history.push("/");
    }
  }, [uid]);

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files && files.length) {
      setImagePreview(URL.createObjectURL(files[0]));
      setImage(files[0]);
      setImageToUpdate("");
    }
  };

  return {
    inputs: {
      recipeName,
      description,
      ingredients,
      instructions,
      category,
      servings,
      imagePreview,
      imageToUpdate,
    },
    setInputs: {
      setRecipeName,
      setDescription,
      setIngredients,
      setInstructions,
      setCategory,
      setServings,
      setImage: changeImage,
    },
    submit: submitNewRecipe,
    edit: editRecipe,
  };
};

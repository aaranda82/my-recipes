import { uniq } from "lodash";
import React, { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import CategoryBar from "../components/CategoryBar";
import RecipeCard, { BlankRecipeCard } from "../components/RecipeCard";
import SpinnerLoader from "../components/SpinnerLoader";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

const { accentColorOne, primaryColorTwo, primaryColorOne } = colorScheme;
const { secondaryFont, mobileMaxWidth } = styles;

const RVSCont = styled.div`
  width: 95%;
  gap: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${primaryColorOne};
  padding: 5px 0;
`;

interface RVSProps {
  bgColor: string | null;
  textColor: string | null;
}

const RViewSelector = styled.div<RVSProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 35px;
  border: 1px solid lightgrey;
  font-family: ${secondaryFont};
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 10px;
    padding: 0;
  } ;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px 0;
  @media (max-width: ${mobileMaxWidth}) {
    box-shadow: none;
  }
`;

const Recipes = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${mobileMaxWidth}) {
    width: 100%;
  }
`;

export const handleRecipeArrayLength = (
  allRecipes: JSX.Element[],
): JSX.Element[] => {
  if (window.screen.width < 500) {
    return allRecipes;
  } else {
    if (allRecipes.length > 4 && allRecipes.length % 4 !== 0) {
      do {
        const key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length % 4 !== 0);
    } else if (allRecipes.length < 4) {
      do {
        const key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length <= 3);
    }
    return allRecipes;
  }
};

interface IRecipe {
  [name: string]: {
    createdBy: string;
    name: string;
    category: string;
    servings: number;
    favoritedBy: string[];
    ingredients: string;
    instructions: string;
    description: string;
  };
}

const AllRecipesPage = (): ReactElement => {
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const categoryToShow = useSelector(
    (state: RootState) => state.categoryReducer,
  );
  const [recipesToShow, setRecipesToShow] = useState("ALL RECIPES");
  const { id } = useParams<{ id: string }>();

  const getCategories = () => {
    if (recipes) {
      const allCategories = [];
      for (const r in recipes) {
        allCategories.push(recipes[r].category);
      }
      const categoriesFromRecipes: string[] = uniq(allCategories);
      return ["ALL", ...categoriesFromRecipes];
    } else {
      return ["ALL"];
    }
  };

  const handleRViewSelector = (type: string) => {
    return (
      <RViewSelector
        onClick={() => setRecipesToShow(type)}
        bgColor={recipesToShow === type ? accentColorOne : "white"}
        textColor={recipesToShow === type ? primaryColorTwo : null}>
        <div>{type}</div>
      </RViewSelector>
    );
  };

  const filterRecipesByCat = () => {
    let recipesByCat: IRecipe = {};
    if (categoryToShow === "ALL") {
      recipesByCat = recipes;
    } else {
      for (const r in recipes) {
        if (recipes[r].category === categoryToShow) {
          recipesByCat[r] = recipes[r];
        }
      }
    }
    return recipesByCat;
  };

  const renderPublicRecipes = () => {
    if (filterRecipesByCat()) {
      let startingIndex = 0;
      const recipeCardsArr = [];
      for (const recipeId in filterRecipesByCat()) {
        const { name, createdBy, description } = filterRecipesByCat()[recipeId];
        const index = startingIndex++;
        const RCProps = {
          description,
          name,
          index,
          recipeId,
          createdBy,
        };
        recipeCardsArr.push(<RecipeCard key={index} {...RCProps} />);
      }
      return handleRecipeArrayLength(recipeCardsArr);
    }
  };

  const renderUserRecipes = (recipesToShow: string) => {
    const recipesByCat = filterRecipesByCat();
    let recipeCardsArr: JSX.Element[] = [];
    let startingIndex = 0;

    if (recipesToShow === "PERSONAL RECIPES") {
      for (const recipeId in recipesByCat) {
        if (recipesByCat[recipeId].createdBy === id) {
          const { name, createdBy, description } = recipesByCat[recipeId];
          const index = startingIndex++;
          const RCProps = {
            description,
            name,
            recipeId,
            index,
            createdBy,
          };
          recipeCardsArr.push(<RecipeCard key={index} {...RCProps} />);
        }
      }
    } else if (recipesToShow === "FAVORITE RECIPES") {
      const favsRecipesCardsArr = [];

      for (const recipeId in recipesByCat) {
        const favsArray = recipesByCat[recipeId].favoritedBy;
        if (favsArray && favsArray.includes(id)) {
          const { name, createdBy, description } = recipesByCat[recipeId];
          const index = startingIndex++;
          const RCProps = {
            name,
            recipeId,
            index,
            description,
            createdBy,
          };
          favsRecipesCardsArr.push(<RecipeCard key={index} {...RCProps} />);
        }
      }
      if (favsRecipesCardsArr.length) {
        recipeCardsArr = favsRecipesCardsArr;
      } else {
        return "NO FAVORITE RECIPES YET";
      }
    }
    return handleRecipeArrayLength(recipeCardsArr);
  };

  const handleRecipes = () => {
    if (recipesToShow === "ALL RECIPES") {
      return renderPublicRecipes();
    } else {
      return renderUserRecipes(recipesToShow);
    }
  };

  return recipes ? (
    <div id="AllRecipesPage">
      <CategoryBar categories={getCategories()}></CategoryBar>
      <Recipes id="Recipes">
        {id ? (
          <>
            <RVSCont>
              {handleRViewSelector("ALL RECIPES")}
              {handleRViewSelector("FAVORITE RECIPES")}
              {handleRViewSelector("PERSONAL RECIPES")}
            </RVSCont>
            <SectionContainer>{handleRecipes()}</SectionContainer>
          </>
        ) : (
          renderPublicRecipes()
        )}
      </Recipes>
    </div>
  ) : (
    <SpinnerLoader />
  );
};

export default AllRecipesPage;

import { uniq } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
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

export function handleRecipeArrayLength(allRecipes: JSX.Element[]) {
  if (window.screen.width < 500) {
    return allRecipes;
  } else {
    if (allRecipes.length > 4 && allRecipes.length % 4 !== 0) {
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length % 4 !== 0);
    } else if (allRecipes.length < 4) {
      do {
        let key = allRecipes.length;
        allRecipes.push(BlankRecipeCard(key));
      } while (allRecipes.length <= 3);
    }
    return allRecipes;
  }
}

interface IRecipe {
  recipeId: string;
  createdBy: string;
  name: string;
  category: string;
  servings: number;
  favoritedBy: string[];
  ingredients: { name: string; quantity: string; unit: string }[];
  instructions: { number: number; instruction: string }[];
}

interface IProps extends RouteComponentProps<{ id: string }> {
  recipes: IRecipe[];
}

interface IState {
  categoryToShow: string;
  recipesToShow: string;
}

class AllRecipesPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      categoryToShow: "ALL",
      recipesToShow: "ALL RECIPES",
    };
    this.changeCategoryToShow = this.changeCategoryToShow.bind(this);
  }

  changeCategoryToShow(categoryToShow: string) {
    this.setState({ categoryToShow });
  }

  filterRecipesByCat() {
    let recipesByCat =
      this.state.categoryToShow === "ALL"
        ? this.props.recipes
        : this.props.recipes.filter(
            (r) => r.category === this.state.categoryToShow,
          );
    return recipesByCat;
  }

  renderPublicRecipes() {
    if (this.filterRecipesByCat()) {
      const allRecipes = this.filterRecipesByCat().map((r: IRecipe, index) => {
        const { recipeId, name, createdBy } = r;
        const RCProps = {
          name,
          recipeId,
          index,
          uid: this.props.match.params.id,
          createdBy,
        };
        return <RecipeCard key={index} {...RCProps} />;
      });
      return handleRecipeArrayLength(allRecipes);
    }
  }

  renderUserRecipes(recipesToShow: string) {
    const recipesByCat = this.filterRecipesByCat();
    let recipes: IRecipe[] = [];
    const uid = this.props.match.params.id;

    let userFavorites2: IRecipe[] = [];

    if (recipesToShow === "PERSONAL RECIPES") {
      recipes = recipesByCat.filter(
        (r) => r.createdBy === this.props.match.params.id,
      );
    } else if (recipesToShow === "FAVORITE RECIPES") {
      this.props.recipes.map((r) => {
        if (r.favoritedBy && r.favoritedBy.length) {
          r.favoritedBy.map((stringUserId) => {
            if (stringUserId === uid) {
              userFavorites2.push(r);
            }
            return false;
          });
        }
        return false;
      });
      if (userFavorites2.length) {
        recipes = userFavorites2;
      } else {
        return "NO FAVORITES YET";
      }
    }

    const userRecipes = recipes.map((r, index) => {
      const { recipeId, name, createdBy } = r;
      const RCProps = {
        name,
        recipeId,
        index,
        uid: this.props.match.params.id,
        createdBy,
      };
      return <RecipeCard key={index} {...RCProps} />;
    });
    return handleRecipeArrayLength(userRecipes);
  }

  handleRecipes() {
    const { recipesToShow } = this.state;
    if (recipesToShow === "ALL RECIPES") {
      return this.renderPublicRecipes();
    } else {
      return this.renderUserRecipes(recipesToShow);
    }
  }

  handleRViewSelector(type: string) {
    return (
      <RViewSelector
        onClick={() => this.setState({ recipesToShow: type })}
        bgColor={this.state.recipesToShow === type ? accentColorOne : "white"}
        textColor={this.state.recipesToShow === type ? primaryColorTwo : null}>
        <div>{type}</div>
      </RViewSelector>
    );
  }

  getCategories() {
    if (this.props.recipes) {
      const categoriesFromRecipes: string[] = uniq(
        this.props.recipes.map((r: IRecipe) => r.category),
      );
      return ["ALL", ...categoriesFromRecipes];
    } else {
      return ["ALL"];
    }
  }

  render() {
    return this.props.recipes ? (
      <div id="AllRecipesPage">
        <CategoryBar
          categories={this.getCategories()}
          categoryToShow={this.state.categoryToShow}
          changeCategoryToShow={this.changeCategoryToShow}></CategoryBar>
        <Recipes id="Recipes">
          {this.props.match.params.id ? (
            <>
              <RVSCont>
                {this.handleRViewSelector("ALL RECIPES")}
                {this.handleRViewSelector("FAVORITE RECIPES")}
                {this.handleRViewSelector("PERSONAL RECIPES")}
              </RVSCont>
              <SectionContainer>{this.handleRecipes()}</SectionContainer>
            </>
          ) : (
            this.renderPublicRecipes()
          )}
        </Recipes>
      </div>
    ) : (
      <SpinnerLoader />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    recipes: state.recipeReducer.recipes,
  };
};

export default withRouter(connect(mapStateToProps)(AllRecipesPage));

import React from "react";
import "../styles/Home.css";
import RecipeHeader from "../components/common/header";
import PopularRecipe from "../components/HomeRecipe/PopularRecipe";
import AllRecipes from "../components/HomeRecipe/AllRecipes";
import { useRecipes } from "../services/recipeContextProvider";
import MobileBottomBar from "../components/MobileBottombar/MBottombar";

const Home = () => {
  const { recipes, loading, error } = useRecipes();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error loading recipes: {error.message}</p>;

  return (
    <div className="home">
      <RecipeHeader />
      <PopularRecipe recipeData={recipes} />
      <AllRecipes recipeData={recipes} title={"All Recipes"} />
      <MobileBottomBar />
    </div>
  );
};

export default Home;

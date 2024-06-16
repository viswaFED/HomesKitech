import React, { useState, useEffect } from 'react';
import { getRandomRecipes } from '../services/Api';
import '../styles/Home.css';
import RecipeHeader from '../components/common/header';
import PopularRecipe from '../components/HomeRecipe/PopularRecipe';
import AllRecipes from '../components/HomeRecipe/AllRecipes';
import RecipeModal from '../components/Modal/RecipeModal';
import { useRecipes } from '../services/recipeContextProvider';


const Home = () => {
  const { recipes, loading, error } = useRecipes();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error loading recipes: {error.message}</p>
  
  return (
    <div className="home">
      <RecipeHeader />
      <PopularRecipe recipeData={recipes} />
      <AllRecipes recipeData={recipes} />
    </div>
  );
};

export default Home;
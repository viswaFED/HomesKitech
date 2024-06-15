import React, { useState, useEffect } from 'react';
// import { getRandomRecipes } from '../services/api';
import '../styles/Home.css';
import RecipeCarousel from '../components/RecipeCarousel';
import data from '../components/data.json'
import RecipeHeader from '../components/common/header';
import PopularRecipe from '../components/PopularRecipe';
import AllRecipes from '../components/AllRecipes';

const Home = () => {
  const [recipes, setRecipes] = useState(data);
//   const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // fetchPopularRecipes();
  }, []);

//   const fetchPopularRecipes = async () => {
//     const response = await getRandomRecipes();
//     setRecipes(response.data.recipes);
//     console.log(response.data.recipes);
//   };


  return (
    <div className="home">
      <RecipeHeader />
      <PopularRecipe recipeData={recipes} />
      <AllRecipes recipeData={recipes} />
    </div>
  );
};

export default Home;
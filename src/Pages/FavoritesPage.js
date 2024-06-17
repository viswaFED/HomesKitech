import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllRecipes from "../components/HomeComponents/AllRecipes";
import MobileBottomBar from "../components/MobileBottombar/MBottombar";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  const loadFavoritesFromStorage = () => {
    try {
      const cachedFavorites = localStorage.getItem("favorites");
      if (cachedFavorites) {
        setFavorites(JSON.parse(cachedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites from local storage:", error);
      setFavorites([]);
    }
  };

  const handleRecipeClick = () => {
    navigate("/Home");
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h4>
          Add more to favorites{" "}
          <h2
            style={{ display: "inline", cursor: "pointer", color: "blue" }}
            onClick={handleRecipeClick}
          >
            Click here
          </h2>
        </h4>
        {favorites.length === 0 ? (
          <p>No recipes available</p>
        ) : (
          <AllRecipes recipeData={favorites} title="My Favorite Recipes" />
        )}
      </div>
      <MobileBottomBar />
    </>
  );
};

export default FavoritesPage;

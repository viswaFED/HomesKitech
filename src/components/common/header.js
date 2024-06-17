import React from "react";
import SearchBar from "../SearchBar";
import "../../styles/Home.css";
import { Link } from "react-router-dom";

const RecipeHeader = () => {
  const user = localStorage.getItem("user") ?? "Foodie";

  return (
    <header className="home-header">
      <div className="home-user">
        <h1>👋 Hey, {user}</h1>
        <p>Discover tasty and healthy recipes!</p>
      </div>
      <div className="search-favorites">
        <button class="favorite-button">
          <Link to={"/recipe/favorites"}>
            <span class="text">❤️ Favorite</span>
          </Link>
        </button>
        <SearchBar />
      </div>
    </header>
  );
};

export default RecipeHeader;

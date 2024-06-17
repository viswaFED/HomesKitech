// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../Pages/HomePage";
import Rrecipe from "../recipeModal";
import RecipePage from "../components/RecipePage/RecipePage";
import FavoritesPage from "../Pages/FavoritesPage";
import LoginPage from "../Pages/loginPage";
import Navbar from "../Navbar/navbar";

const AppContent = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Navbar />
      <Routes location={previousLocation || location}>
        <Route path="/Home" element={<Home />} />
        <Route path="/recipe/:id/:title" element={<RecipePage />} />
        <Route path="/recipe/favorites" element={<FavoritesPage />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/recipe/:id" element={<Rrecipe />} />
        </Routes>
      )}
    </>
  );
};

export default AppContent;
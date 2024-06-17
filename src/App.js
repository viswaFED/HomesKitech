import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { RecipeProvider } from "./services/recipeContextProvider";
import Home from "./Pages/HomePage";
import RecipePage from "./components/RecipePage/RecipePage";
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/loginPage";
import Navbar from "./Navbar/navbar";
import ModalRecipe from "./Pages/recipeModal";

const PrivateRoutes = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id/:title" element={<RecipePage />} />
        <Route path="/recipe/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Routes>
        {previousLocation && (
          <Route path="/recipes/:id" element={<ModalRecipe />} />
        )}
      </Routes>
    </>
  );
};

function App() {
  return (
    <RecipeProvider>
      <Router>
        <PrivateRoutes />
      </Router>
    </RecipeProvider>
  );
}

export default App;

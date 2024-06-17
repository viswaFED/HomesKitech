import React from "react";
import "./loginPage.css";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../services/recipeContextProvider";

const LoginPage = () => {
  const { login } = useRecipes();
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    await login();
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>
          Welcome to <span>Reciipie</span>
        </h1>
        <p>Please sign in to continue</p>
        <button className="google-signin" onClick={handleSignInWithGoogle}>
          <FaGoogle />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
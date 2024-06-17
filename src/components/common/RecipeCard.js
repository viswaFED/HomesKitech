import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, type }) => {
  return (
    <div className={`card ${type}`}>
      <Link to={`/recipe/${recipe.id}/${recipe.title}`}>
        <div className='card-image'>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        </div>
        <div className="card-content">
          <h3>{recipe.title}</h3>
          <p>Ready in {recipe.readyInMinutes} mins</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;

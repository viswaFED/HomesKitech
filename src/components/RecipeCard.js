// src/components/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe, type }) => {
  return (
    <div className={`card ${type}`}>
      <Link to={`/recipe/${recipe.id}`}>
        <div className='card-image'>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        </div>
        <div className="card-content">
          <h3>Buddha Kat Winery Chardonnay Very speicy</h3>
          <p>Ready in 25 min</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;

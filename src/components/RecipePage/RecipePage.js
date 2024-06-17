import React, { useState, useEffect } from 'react';
import './RecipePage.css';
import { useParams } from 'react-router-dom';
import { getRecipeInformation } from '../../services/Api';
import SimilarRecipe from '../SimilarRecipe';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchRecipeDetail();
    }, [id]);

    useEffect(() => {
        const cachedFavorites = localStorage.getItem('favorites');
        if (cachedFavorites) {
            setFavorites(JSON.parse(cachedFavorites));
        }
    }, []);

    const fetchRecipeDetail = async () => {
        setIsLoading(true);
        try {
            const response = await getRecipeInformation(id);
            setRecipe(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleFavorite = (recipe) => {
        let updatedFavorites;
        if (favorites.some(fav => fav.id === recipe.id)) {
            updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
        } else {
            updatedFavorites = [...favorites, recipe];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (recipeId) => {
        return favorites.some(fav => fav.id === recipeId);
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                recipe && (
                    <div className="main-container">
                        <div className="recipe-container">
                            <div className="image-container">
                                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                                <button className="back-button" onClick={handleBack}>←</button>
                                <button className="fav-button" onClick={() => handleFavorite(recipe)}> {isFavorite(recipe.id) ? '❤️':'❤'}</button>
                                <h1 className='title-recipe'>{recipe.title}</h1>
                            </div>
                            <div className="info-container">
                                <div className="info-card">
                                    <div>Ready in</div>
                                    <div className='info-value'>{recipe.readyInMinutes}</div>
                                </div>
                                <div className="info-card">
                                    <div>Servings</div>
                                    <div className='info-value'>{recipe.servings}</div>
                                </div>
                                <div className="info-card">
                                    <div>Price/serving</div>
                                    <div className='info-value'>{recipe.pricePerServing}</div>
                                </div>
                            </div>
                            <h2 className='ingredients-title'>Ingredients</h2>
                            <div className="ingredients">
                                <ul>
                                    {recipe.extendedIngredients.map((ingredient) => (
                                        <li key={ingredient.id}>{ingredient.original}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="instructions">
                                <h2>Instructions</h2>
                                <ul>
                                    {recipe.instructions.split('\n\n').map((step, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="summary">
                                <h2>Quick Summary</h2>
                                <ul>
                                    {recipe.summary.split('\n\n').map((step, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
                                    ))}
                                </ul>
                            </div>
                            <ul className='nutrition'>
                                <h2>Nutrition</h2>
                                {recipe.nutrition && recipe.nutrition.nutrients && recipe.nutrition.nutrients.length > 0 ? (
                                    recipe.nutrition.nutrients.map((nutrient) => (
                                        <li key={nutrient.name}>
                                            {nutrient.name}: {nutrient.amount} {nutrient.unit}
                                        </li>
                                    ))
                                ) : (
                                    <p>Nutrition information is not available.</p>
                                )}
                            </ul>
                        </div>
                        <div className="similar-recipes-container">
                            <SimilarRecipe />
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default RecipePage;

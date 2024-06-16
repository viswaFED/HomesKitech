
import React, { useState, useEffect, useCallback } from 'react';
import './RecipePage.css';
import { useParams } from 'react-router-dom';
import { getRecipeInformation } from '../../services/Api';
import SimilarRecipe from '../SimilarRecipe';
import { useNavigate } from 'react-router-dom';
// import { useRecipes } from '../../services/recipeContextProvider';


const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedItems, setSelectedItems] = useState(getInitialSelectedItems)

    useEffect(() => {
        fetchRecipeDetail();
    }, [id]);

    // useEffect(() => {
    //     const cachedFavorites = localStorage.getItem('favorites');
    //     if (cachedFavorites) {
    //         setFavorites(JSON.parse(cachedFavorites));
    //     }
    // }, []);

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

    if (isLoading) <p>Loading...</p>

    const handleBack = () => {
        navigate(-1);
    }

    const handleFavorite = (recipe) => {
        const updatedFavorites = [...favorites, recipe];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <>
            {recipe && (
                <>
                    <div class="main-container">
                        <div class="recipe-container">
                            <div class="image-container">
                                <img src={recipe.image} alt={recipe.title} class="recipe-image" />
                                <button class="back-button" onClick={handleBack}>←</button>
                                <button class="fav-button" onClick={handleFavorite(recipe)}>❤</button>
                                <h1 class='title-recipe'>{recipe.title}</h1>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <div>Ready in</div>
                                    <div className='info-value'>{recipe.readyInMinutes}</div>
                                </div>
                                <div class="info-item">
                                    <div>servings</div>
                                    <div className='info-value'>{recipe.servings}</div>
                                </div>
                                <div class="info-item">
                                    <div>Price/serving</div>
                                    <div className='info-value'>{recipe.pricePerServing}</div>
                                </div>
                            </div>
                            <h2 className='ingredients-title'>Ingredients</h2>
                            <div class="ingredients">
                                {recipe.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </div>
                            <div className="instructions">
                                <h2>Instructions</h2>
                                <li>
                                    {recipe.instructions.split('\n\n').map((step, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
                                    ))}
                                </li>
                            </div>
                            <div className="summary">
                                <h2>Quick Sumamry</h2>
                                {recipe.summary.split('\n\n').map((step, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
                                ))}
                            </div>
                            <ul className='nutrition'>
                                <h2>nutrition</h2>
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
                        <div class="similar-recipes-container">
                            <SimilarRecipe />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default RecipePage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientRecipeCard from '../ingrediants/ingrediants';
import FullRecipe from '../FullRecipe/fullrecipe';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import SimilarRecipe from '../SimilarRecipe';
import '../../styles/RecipeModal.css'; 
import { IngredientsButton, FullRecipeButton, SimilarRecipesButton } from '../common/bottombotton';

const RecipeModal = ({ recipe }) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [ingredients, setIngredients] = useState(null);
    const [fullRecipe, setFullRecipe] = useState(null);
    const [similarRecipe, setSimilarRecipe] = useState(null);
    const [currentView, setCurrentView] = useState('home');
    const [loading, setLoading] = useState(false);
    const [favorite, setIsFavorite] = useState(null);
    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeModal = () => {
        navigate('/');
    };

    const addToFavorites = (recipe) => {
        // let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        // const index = favorites.findIndex(fav => fav.id.toString() === recipe.id.toString());

        // if (index === -1) {
        //     favorites.push(recipe);
        // } else {
        //     favorites.splice(index, 1);
        // }

        // localStorage.setItem('favorites', JSON.stringify(favorites));
        // setIsFavorite(index === -1); // Update state to reflect the change
    };

    const isFavorites = (recipe) => {
        // const data = JSON.parse(localStorage.getItem('favorites')) || [];
        // return data.some(fav => fav.id.toString() === recipe.id.toString());
    };

    const fetchIngredients =  () => setCurrentView('ingredient');    

    const fetchFullRecipe =  () => setCurrentView('fullRecipe');
    

    const handleBack = () => {
        console.log(currentView);
        switch (currentView) {
            case 'similarRecipes':
                setCurrentView('fullRecipe');
                break;
            case 'fullRecipe':
                setCurrentView('ingredient');
                break;
            case 'ingredient':
                setCurrentView('home')
            default:
                closeModal()
                break;
        }
    };
    const viewComponents = {
        ingredient: <IngredientRecipeCard />,
        fullRecipe: (
            <>
                <IngredientRecipeCard />
                <FullRecipe />
            </>
        ),
        similarRecipes: (
            <>
                <IngredientRecipeCard />
                <FullRecipe />
                <SimilarRecipe />
            </>
        ),
        home: '',
    };



    const RenderButtons = ({ ingredients, fullRecipe, fetchIngredients, fetchFullRecipe, moreRecipe }) => {
        if (currentView === 'home') {
            return <IngredientsButton onClick={fetchIngredients} />;
        }

        if (currentView === 'ingredient') {
            return <FullRecipeButton onClick={fetchFullRecipe} />;
        }

        if (currentView === 'fullRecipe') {
            return <SimilarRecipesButton onClick={() => setCurrentView('similarRecipes')} />;
        }

        return null;
    };

    return (
        <>
            <div className='overlay' onClick={closeModal}></div>
            <div className={`modal ${!isMobile && 'desktop'}`}>
                <div className='header'>
                    <button onClick={handleBack} className='button'>
                        <FaRegArrowAltCircleLeft />
                    </button>
                    <h2 className='modal-title'>{recipe.title}</h2>
                    <button className='button' onClick={() => addToFavorites(recipe.id)}>
                        {isFavorites(recipe) ? <MdFavoriteBorder /> : <MdFavorite fill='red' />} {/* Heart icon */}
                    </button>
                </div>
                <div className='content'>
                    {currentView === 'home' && (
                        <>
                            <img src={recipe.image} alt={recipe.title} className='image' />
                            <p>{recipe.description}</p>
                            <div className='info-container'>
                                <div className='info-item'>
                                    <p className='info'>Ready in</p>
                                    <p className='info'>{recipe.readyInMinutes} min</p>
                                </div>
                                <div className='info-item'>
                                    <p className='info'>Servings</p>
                                    <p className='info'>{recipe.servings}</p>
                                </div>
                                <div className='info-item'>
                                    <p className='info'>Price/servings</p>
                                    <p className='info'>${recipe.pricePerServing}</p>
                                </div>
                            </div>
                        </>
                    )}
                    {currentView != "home" && (<div className='modalScrolldiv'>
                        {viewComponents[currentView]}
                    </div>)}
                    <RenderButtons
                        ingredients={ingredients}
                        fullRecipe={fullRecipe}
                        fetchIngredients={fetchIngredients}
                        fetchFullRecipe={fetchFullRecipe}
                        setSimilarRecipe={setSimilarRecipe}
                    />
                </div>
            </div>
        </>
    );
};

export default RecipeModal;
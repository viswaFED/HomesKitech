import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const location = useLocation();
    const isModalOpen = location.pathname.includes('/recipe/:id')
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [currentView, setCurrentView] = useState('home');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isModalOpen]);

    useEffect(() => {
        const cachedFavorites = localStorage.getItem('favorites');
        if (cachedFavorites) {
            setFavorites(JSON.parse(cachedFavorites));
        }
    }, []);

    const closeModal = () => {
        navigate('/Home');
    };

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
                break;
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



    const RenderButtons = () => {
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
                    <button className='button' onClick={() => handleFavorite(recipe)}>
                        {isFavorite(recipe.id) ? <MdFavorite fill='red' /> : <MdFavoriteBorder />}
                    </button>
                </div>
                <div className='content'>
                    {currentView === 'home' && (
                        <>
                            <img src={recipe.image} alt={recipe.title} className='image' />
                            <p>{recipe.description}</p>
                            <div className='info'>
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
                    {currentView !== "home" && (<div className='modalScrolldiv'>
                        {viewComponents[currentView]}
                    </div>)}
                    <RenderButtons/>
                </div>
            </div>
        </>
    );
};

export default RecipeModal;
import React, { createContext, useState, useEffect } from 'react';
import { getRandomRecipes } from './Api';
const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await getRandomRecipes();
                setRecipes(response.data.recipes);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <RecipeContext.Provider value={{ recipes, loading, error, favorites, setFavorites }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => React.useContext(RecipeContext);

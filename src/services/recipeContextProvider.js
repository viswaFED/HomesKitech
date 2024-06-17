import React, { createContext, useState, useEffect } from 'react';
import { getRandomRecipes } from './Api';
import {  auth, googleProvider } from '../firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { displayName } = result.user;
            localStorage.setItem('user', displayName);
            localStorage.setItem('loggedIn', true)
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Error during sign in:", error);
        }
    };

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
        <RecipeContext.Provider value={{ recipes, isLoggedIn, login, loading, error}}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => React.useContext(RecipeContext);

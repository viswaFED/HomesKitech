import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import RecipeModal from "../components/Modal/RecipeModal";
import { getRecipeInformation } from '../services/Api';

const Modalrecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchRecipeDetail(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchRecipeDetail = async () => {
        setIsLoading(true);
        try {
            const response = await getRecipeInformation(id);
            setRecipe(response.data);
            // console.log(response);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {recipe ? <RecipeModal recipe={recipe} /> : <p>Recipe not found</p>}
        </div>
    );
}
export default Modalrecipe;
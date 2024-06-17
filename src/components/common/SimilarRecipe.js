import React, { useEffect, useState } from 'react';
import '../FullRecipe/fullrecipe.css'
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import RecipeCard from './RecipeCard';
import { getSimilarRecipes } from '../../services/Api';
import { useParams } from 'react-router-dom';

const SimilarRecipe = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [similarRecipe, setSimilarRecipe] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getSimilarRecipes(id)
                setSimilarRecipe(response?.data || []);
                // console.log(response)
            } catch (error) {
                console.error('Error fetching instructions:', error);
            }
        }
        fetchRecipes();
    }, [id])
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="recipe-page">
            <div className='fullrecipe-card-title' onClick={toggleOpen}>
                <span style={{ fontSize: '17px', padding: '10px' }}>
                    similar Recipe
                </span>
                <span>
                    {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                </span>
            </div>
            {isOpen &&
                 similarRecipe && similarRecipe.map((recipe, index) => {
                    return <RecipeCard key={recipe.id} recipe={recipe} type="similar" />
                })
            }
        </div>
    )
}
export default SimilarRecipe;
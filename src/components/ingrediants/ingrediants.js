import './ingrediants.css'
import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { getIngredients } from '../../services/Api';
import { useParams } from 'react-router-dom';

const IngredientRecipeCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();

    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await getIngredients(id);
                setIngredients(response?.data?.ingredients || []);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="recipe-card-ingredients">
                <div className='recipe-card-title' onClick={toggleOpen}>
                    <span style={{ fontSize: '17px', padding: '10px' }}>
                        Ingredients
                    </span>
                    <span>
                        {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                    </span>
                </div>
                {isOpen && (
                    <div className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                            <div className="ingredient" key={index + 1}>
                                <img
                                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                                    alt={ingredient.name}
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <p>{ingredient.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default IngredientRecipeCard;

import React, { useState } from 'react';
import './fullrecipe.css'
import Section from '../common/FullRecipeSections';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { fetchEquipment, fetchInstructions, fetchSummary, fetchNutrition } from '../common/apiModule';
const FullRecipe = ({ title }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { id } = useParams();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="recipe-page">
            {title === 'Mrecipe' ? (
                <div style={{
                    margin: 0,
                    marginTop: '10px',
                    paddingLeft: '10px',
                    backgroundColor: 'white',
                    border: 'none',
                }}>
                    <span style={{ fontSize: '17px', padding: '10px' }}>
                        Full Recipe
                    </span>
                </div>
            ) :
                <div className='fullrecipe-card-title' onClick={toggleOpen}>
                    <span style={{ fontSize: '17px', padding: '10px' }}>
                        Full Recipe
                    </span>
                    <span>
                        {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                    </span>
                </div>
            }
            {isOpen && (
                <>
                    <Section title="Instructions" fetchData={()=>fetchInstructions(id)} />
                    <Section title="Equipments" fetchData={()=>fetchEquipment(id)} />
                    <Section title="Quick Summary" fetchData={()=>fetchSummary(id)} />
                    <Section title="Nutrition" fetchData={()=>fetchNutrition(id)} />
                </>
            )}
        </div>
    );
};

export default FullRecipe;
import React, { useState, useEffect } from 'react';
// import {searchRecipes } from '../../services/api';
import SearchBar from '../SearchBar';
import '../../styles/Home.css';

const RecipeHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        // fetchPopularRecipes();
    }, []);

    const handleSearch = async () => {
        // const response = await searchRecipes(searchQuery);
        // setRecipes(response.data.results);
    };
    return (
        <header className="home-header">
            <div className='home-user'>
                <h1>👋 Hey, [User]</h1>
                <p>Discover tasty and healthy recipes!</p>
            </div>
            <div className="search-favorites">
                <button class="favorite-button">
                    <span class="text">❤️ Favorite</span>
                </button>
                <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
            </div>
        </header >
    )
}

export default RecipeHeader;
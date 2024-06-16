import React from 'react';
import SearchBar from '../SearchBar';
import '../../styles/Home.css';

const RecipeHeader = () => {
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
                <SearchBar/>
            </div>
        </header >
    )
}

export default RecipeHeader;
import React from 'react';
import '../styles/Searchbar.css'

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div class="search-container">
            <input
                type="text"
                className='search-input'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchBar;

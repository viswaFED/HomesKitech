import '../styles/Searchbar.css'
import React, { useState, useEffect } from 'react';
import { searchQuery } from '../services/Api';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

const SearchBar = () => {
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) return; 

            setIsLoading(true);

            try {
                const response = await searchQuery(query)
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const clearInput = () => {
        setIsFocused(false);
        setQuery('')
        setSuggestions([])
    }
    const handleSuggestionClick = (suggestion) => {
        console.log("Selected recipe:", suggestion);
        setQuery('');
        setSuggestions([]);
    };

    return (
        <div className='search-container'>
            <span className="search-icon"></span>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a recipe..."
                className="search-input"
                onFocus={handleInputFocus}
            // onBlur={handleInputBlur}
            />
            {isFocused && (
                <span className="close-icon" onClick={() => clearInput()} >
                    <IoMdClose />
                </span>
            )}
            <ul className="suggestions-list">
            {isLoading && <p>Loading...</p>}
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        <Link to={`/recipe/${suggestion.id}`} state={{ previousLocation: location }} style={{ textDecoration: 'none', color:"black" }}>
                            {suggestion.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;


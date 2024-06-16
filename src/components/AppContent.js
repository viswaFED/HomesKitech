// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Pages/HomePage';
import Rrecipe from '../recipeModal';
import RecipePage from '../components/RecipePage/RecipePage';

const AppContent = () => {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    return (
      <>
        <Routes location={previousLocation || location}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/recipe/:id" element={<Rrecipe />} /> */}
          <Route path="/recipe/:id/:title" element={<RecipePage />} />
          {/* <Route path="/favorites" element={} /> */}
        </Routes>
        {previousLocation && (
          <Routes>
            <Route path="/recipe/:id" element={<Rrecipe />} />
          </Routes>
        )}
      </>
    );
  };

export default AppContent;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppContent from './components/AppContent';
import { RecipeProvider } from './services/recipeContextProvider';

function App() {

  return (
    <RecipeProvider>
      <Router>
        <AppContent />
      </Router>
    </RecipeProvider>
  );
}

export default App;

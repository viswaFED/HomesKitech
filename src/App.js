// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage';
import RecipeDetail from './components/RecipeDetail';
// import Favorites from './components/Favorites';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/recipe/:id" element={<RecipeDetail/>} />
        {/* <Route path="/favorites" component={Favorites} /> */}
      </Routes>
    </Router>
    <div>Heko</div></>
  );
}

export default App;

import axios from 'axios';

const apiKey = 'ee1a2e8902c54fd08b5b5eb00c467821';
const api = axios.create({
  baseURL: 'https://api.spoonacular.com/',
});

export const getRandomRecipes = (number = 10) => {
  return api.get(`recipes/random?number=${number}&apiKey=${apiKey}`);
};

export const searchRecipes = (query) => {
  return api.get(`recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
};

export const getRecipeInformation = (id) => {
  return api.get(`recipes/${id}/information?apiKey=${apiKey}`);
};

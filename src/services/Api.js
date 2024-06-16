import axios from 'axios';
import { baseURL,apiKey } from './config';


const api = axios.create({baseURL: baseURL,});

export const getRandomRecipes = (number = 10) => {
    return api.get(`recipes/random?number=${number}&apiKey=${apiKey}`);
};

export const searchRecipes = (query) => {
    return api.get(`recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
};

export const getRecipeInformation = (id) => {
    return api.get(`recipes/${id}/information?includeNutrition=${true}&apiKey=${apiKey}`);
};

export const getIngredients = (id) => {
    return api.get(`recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`);
};

export const getSimilarRecipes = (id) => {
    return api.get(`recipes/${id}/similar?apiKey=${apiKey}`)
}

export const getInstructions = (id) => {
    return api.get(`recipes/${id}/analyzedInstructions?apiKey=${apiKey}`)
}
export const getEquipmentWidget = (id) => {
    return api.get(`recipes/${id}/equipmentWidget.json?apiKey=${apiKey}}`)

}
export const getSummary = (id) => {
    return api.get(`recipes/${id}/summary?apiKey=${apiKey}`)

}
export const getNutritionWidget = (id) => {
    return api.get(`recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`)
}

export const searchQuery = (query) =>{
return api.get(`recipes/autocomplete`, {
    params: {
        number: 10,
        query,
        apiKey,
    },
});
}
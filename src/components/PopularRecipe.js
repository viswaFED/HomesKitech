import '../styles/Home.css';
import RecipeCarousel from './RecipeCarousel';

const PopularRecipe = ({recipeData}) => {
    return (
        <section className="popular-recipes">
            <h2>Popular Recipes</h2>
            <div className="recipe-carousel">
                <RecipeCarousel recipes={recipeData} type="popular" />
            </div>
        </section>
    )
}

export default PopularRecipe;
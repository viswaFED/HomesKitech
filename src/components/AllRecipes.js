import RecipeCard from './RecipeCard';

const AllRecipes = ({ recipeData }) => {

    return (
        <>
            <section className="all-recipes">
                <h2>All Recipes</h2>
                <div className="card-grid">
                    {recipeData.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} type="all" />
                    ))}
                </div>
            </section>
            <div className="loading-more">
                <p>Loading more recipes</p>
            </div>
        </>
    )
}
export default AllRecipes;
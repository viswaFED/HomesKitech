import RecipeCard from '../common/RecipeCard';

const AllRecipes = ({ recipeData, title }) => {

    return (
        <>
            <section className="all-recipes">
                <h2>{title}</h2>
                <div className="card-grid">
                    {recipeData.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} type="all" />
                    ))}
                </div>
            </section>
            <div className="loading-more">
                <p>Loading more recipes...</p>
            </div>
        </>
    )
}
export default AllRecipes;
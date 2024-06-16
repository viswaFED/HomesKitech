const ButtonContainer = ({ children }) => (
    <div style={{ background: 'white', width: 'auto', height: 'auto', display: 'flex', borderTop: '1px solid #00000033', borderRadius: '12px' }}>
        {children}
    </div>
);

export const IngredientsButton = ({ onClick }) => (
    <ButtonContainer>
        <button className='button-common get-ingredients-button' onClick={onClick}>
            Get Ingredients &#x2192;
        </button>
    </ButtonContainer>
);

export const FullRecipeButton = ({ onClick }) => (
    <ButtonContainer>
        <button className='button-common full-recipe-button' onClick={onClick}>
            Get Full Recipe &#x2192;
        </button>
    </ButtonContainer>
);

export const SimilarRecipesButton = ({ onClick }) => (
    <ButtonContainer>
        <button className='button-common full-recipe-button' onClick={onClick}>
            Similar Recipes &#x2192;
        </button>
    </ButtonContainer>
);
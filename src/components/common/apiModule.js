import { getEquipmentWidget, getInstructions, getNutritionWidget, getSummary } from '../../services/Api';

export const fetchInstructions = async (id) => {
    try {
        const response = await getInstructions(id)
        return response.data[0].steps.map((step, index) => <p key={index}>{step.step}</p>);
    } catch (error) {
        console.error('Error fetching instructions:', error);
        return <p>Error loading instructions.</p>;
    }
};

export const fetchEquipment = async (id) => {
    try {
        const response = await getEquipmentWidget(id)
        return (
            <ul>
                {response.data.equipment.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        );
    } catch (error) {
        console.error('Error fetching equipment:', error);
        return <p>Error loading equipment.</p>;
    }
};

export const fetchSummary = async (id) => {
    try {
        const response = await getSummary(id)
        return <p dangerouslySetInnerHTML={{ __html: response.data.summary }} />;
    } catch (error) {
        console.error('Error fetching summary:', error);
        return <p>Error loading summary.</p>;
    }
};

export const fetchNutrition = async (id) => {
    try {
        const response = await getNutritionWidget(id)
        const { calories, carbs, fat, protein } = response.data;
        return (
            <>
                <p>Calories: {calories}</p>
                <p>Carbs: {carbs}</p>
                <p>Fat: {fat}</p>
                <p>Protein: {protein}</p>
            </>
        );
    } catch (error) {
        console.error('Error fetching nutrition:', error);
        return <p>Error loading nutrition.</p>;
    }
};
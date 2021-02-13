import { useRecipeEditForm } from "../../../hooks/recipeEditForm";
import EditWrapper from './EditWrapper';
import IngredientListInput from "../recipeForm/IngredientListInput";
import { DragDropContext } from "react-beautiful-dnd";

function EditIngredients({recipe}) {
    const { 
        handleChange, 
        validateAndSubmit, 
        inputValues, 
        inputErrors,
        addToList,
        removeFromList,
        handleDragEnd 
    } = useRecipeEditForm(['ingredients'],null,'ingredients')

    return (
        <EditWrapper height="80%" maxWidth="800px" onChange={handleChange} onSubmit={validateAndSubmit}>
            <DragDropContext onDragEnd={handleDragEnd} >
                <IngredientListInput 
                    addToList={addToList}
                    removeFromList={removeFromList}
                    values={inputValues}
                    errors={inputErrors}
                />
            </DragDropContext>
        </EditWrapper>
    )
}

export default EditIngredients 
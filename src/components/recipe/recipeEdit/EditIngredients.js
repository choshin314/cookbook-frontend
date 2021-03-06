import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
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
        handleDragEnd,
        resetForm,
        isSubmitting 
    } = useRecipeEditForm(['ingredients'],'ingredients')

    return (
        <EditWrapper 
            height="80%" 
            maxWidth="800px" 
            onChange={handleChange} 
            onSubmit={validateAndSubmit}
            resetForm={resetForm}
            isSubmitting={isSubmitting}
        >
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
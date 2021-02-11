import { useRecipeEditForm } from "../../../hooks/recipeEditForm";
import EditWrapper from './EditWrapper';
import TagListInput from "../recipeForm/IngredientListInput";

function EditTags({recipe}) {
    const { 
        handleChange, 
        validateAndSubmit, 
        inputValues, 
        inputErrors,
        addToList,
        removeFromList
    } = useRecipeEditForm(['ingredients'])

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit}>
            <TagListInput 
                addToList={addToList}
                removeFromList={removeFromList}
                values={inputValues}
                errors={inputErrors}
            />
        </EditWrapper>
    )
}

export default EditTags 
import { useRecipeEditForm } from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import TagListInput from "../recipeForm/TagListInput";

function EditTags({recipe}) {
    const { 
        handleChange, 
        validateAndSubmit, 
        inputValues, 
        inputErrors,
        addToList,
        removeFromList,
        resetForm
    } = useRecipeEditForm(['tags'],null,'tags')

    console.log(inputValues);

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit} resetForm={resetForm}>
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
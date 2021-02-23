import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import TagListInput from "../recipeForm/TagListInput";
import Spinner from '../../shared/Spinner';

function EditTags({recipe}) {
    const { 
        handleChange, 
        validateAndSubmit, 
        inputValues, 
        inputErrors,
        addToList,
        removeFromList,
        resetForm,
        isSubmitting
    } = useRecipeEditForm(['tags'],'tags')

    console.log(inputValues);

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit} resetForm={resetForm}>
            {isSubmitting && <Spinner />} 
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
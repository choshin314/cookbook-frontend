import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import Input from "../../shared/Input";

function EditTitle({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm 
    } = useRecipeEditForm(['title'],null,'general')

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit} resetForm={resetForm}>
            <Input
                name="title"
                value={inputValues.title}
                errorMsg={inputErrors.title}
                type="text"
                label={{ text: 'Edit Title'}}
            /> 
        </EditWrapper>
    )
}

export default EditTitle 


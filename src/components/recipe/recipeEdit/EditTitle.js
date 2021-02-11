import { useRecipeEditForm } from "../../../hooks/recipeEditForm";
import EditWrapper from './EditWrapper';
import Input from "../../shared/Input";

function EditTitle({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors 
    } = useRecipeEditForm(['title'])

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit}>
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


import { useRecipeEditForm } from "../../../hooks/recipeEditForm";
import EditWrapper from './EditWrapper';
import ImgInput from "../../shared/ImgInput";

function EditCoverImg({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors 
    } = useRecipeEditForm(['coverImg'], 'coverImg')

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit}>
            <ImgInput
                name="coverImg" 
                label={{ text: 'New Cover Image', hide: true }} 
                imgSize="5mb" 
                file={inputValues.coverImg}
                errorMsg={inputErrors.coverImg}
            />
        </EditWrapper>
    )
}

export default EditCoverImg 

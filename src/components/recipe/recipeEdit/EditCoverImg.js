import { useRecipeEditForm } from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import ImgInput from "../../shared/ImgInput";

function EditCoverImg({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm
    } = useRecipeEditForm(['coverImg'], 'coverImg', 'cover-img')

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit} resetForm={resetForm}>
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

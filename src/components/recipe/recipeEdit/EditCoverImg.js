import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import ImgInput from "../../shared/ImgInput";
import Spinner from '../../shared/Spinner';

function EditCoverImg({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm, isSubmitting
    } = useRecipeEditForm(['coverImg'], 'cover-img', 'coverImg')

    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit} resetForm={resetForm}>
            {isSubmitting && <Spinner />} 
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

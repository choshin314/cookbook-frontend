import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper'
import Input from "../../shared/Input";

function EditIntro({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm, isSubmitting 
    } = useRecipeEditForm(['intro'],'general')

    return (
        <EditWrapper 
            onChange={handleChange} 
            onSubmit={validateAndSubmit} 
            resetForm={resetForm}
            isSubmitting={isSubmitting}
        >
            <Input 
                name="intro"
                value={inputValues.intro}
                errorMsg={inputErrors.intro}
                type="textarea"
                label={{ text: "Update Introduction", hide: false }}
                charLimit={400}
                textRows={8}
            />
        </EditWrapper>
    )
}

export default EditIntro 
import styled from 'styled-components'

import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import Input from "../../shared/Input";
import Spinner from '../../shared/Spinner';

function EditQuickFacts({recipe}) {
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm, isSubmitting 
    } = useRecipeEditForm(['prepTime', 'cookTime', 'servings'], 'general')
    return (
        <EditWrapper onChange={handleChange} onSubmit={validateAndSubmit} resetForm={resetForm}>
            <Flex>
                {isSubmitting && <Spinner />} 
                <Input 
                    name="prepTime"
                    value={inputValues.prepTime}
                    errorMsg={inputErrors.prepTime}
                    type="number" 
                    min={1}
                    label={{ text: "Prep (Mins.)", hide: false }}
                    placeholder="" 
                />
                <Input 
                    name="cookTime"
                    value={inputValues.cookTime}
                    errorMsg={inputErrors.cookTime}
                    type="number" 
                    min={1}
                    label={{ text: "Cook (Mins.)", hide: false }}
                    placeholder="" 
                />
                <Input 
                    name="servings"
                    value={inputValues.servings}
                    errorMsg={inputErrors.servings}
                    type="number" 
                    min={1}
                    label={{ text: "Servings", hide: false }}
                    placeholder="" 
                />
            </Flex>
        </EditWrapper>
    )
}

export default EditQuickFacts 

const Flex = styled.div`
    display: flex;
    max-width: 100%;
    justify-content: space-between;
    > div {
        flex: 0 1 30%;
        max-width: 30%;
        & input {
            width: 100%;
        }
    }
`
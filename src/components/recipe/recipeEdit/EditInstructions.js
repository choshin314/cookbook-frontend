import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import InstructionListInput from "../recipeForm/InstructionListInput";
import { DragDropContext } from "react-beautiful-dnd";
import Spinner from '../../shared/Spinner';

function EditInstructions({recipe}) {
    const { 
        handleChange, 
        validateAndSubmit, 
        inputValues, 
        inputErrors,
        addToList,
        removeFromList,
        handleDragEnd ,
        resetForm,
        isSubmitting
    } = useRecipeEditForm(['instructions'],'instructions')

    return (
        <EditWrapper 
            height="80%" 
            maxWidth="800px" 
            onChange={handleChange} 
            onSubmit={validateAndSubmit}
            resetForm={resetForm}
        >
            {isSubmitting && <Spinner />} 
            <DragDropContext onDragEnd={handleDragEnd} >
                <InstructionListInput 
                    addToList={addToList}
                    removeFromList={removeFromList}
                    values={inputValues}
                    errors={inputErrors}
                />
            </DragDropContext>
        </EditWrapper>
    )
}

export default EditInstructions 
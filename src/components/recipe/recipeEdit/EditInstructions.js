import useRecipeEditForm from "../../../hooks/recipeEditForm";
import EditWrapper from '../../shared/EditWrapper';
import InstructionListInput from "../recipeForm/InstructionListInput";
import { DragDropContext } from "react-beautiful-dnd";

function EditInstructions({recipe}) {
    const { 
        handleChange, 
        validateAndSubmit, 
        inputValues, 
        inputErrors,
        addToList,
        removeFromList,
        handleDragEnd ,
        resetForm
    } = useRecipeEditForm(['instructions'],'instructions')

    return (
        <EditWrapper 
            height="80%" 
            maxWidth="800px" 
            onChange={handleChange} 
            onSubmit={validateAndSubmit}
            resetForm={resetForm}
        >
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
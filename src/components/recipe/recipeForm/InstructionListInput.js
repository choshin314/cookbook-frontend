import {useState } from 'react'

import ListDraggable from '../../shared/ListDraggable'
import Input from '../../shared/Input'

function InstructionListInput(props) {
    const [draftError, setDraftError] = useState();
    const { addToList, removeFromList, values, errors } = props;
    const { instructions, instructionDraft } = values;
    function validateAndAdd(e) {
        e.preventDefault();
        setDraftError(null);
        const trimmed = instructionDraft.trim();
        const length = trimmed.length;
        if (length < 5) {
            return setDraftError('Elaborate! (minimum 5 characters)')
        } 
        addToList('instructions', ['instructionDraft'])
    }

    return (
        <ListDraggable
            list={instructions}
            listName="instructions"
            handleDelete={(itemId) => removeFromList('instructions', itemId)}
            listErrorMsg={errors.instructions}
            displayContent={item => item.content}
        >
            <Input
                name="instructionDraft"
                label={{text: "Add Instructions"}}
                placeholder="e.g. Saute the onions in medium oil until golden brown"
                value={instructionDraft}
                errorMsg={draftError}
                onKeyDown={e => {
                    if (e.key === "Enter") validateAndAdd(e)
                }} 
                onClick={validateAndAdd}
            />
        </ListDraggable>
    )
}

export default InstructionListInput;

import {useState } from 'react'

import ListDraggable from '../../shared/ListDraggable'
import Input from '../../shared/Input'

function InstructionListInput(props) {
    const [ instructionDraft, setInstructionDraft ] = useState({ content: '' });
    const [draftError, setDraftError] = useState();
    const { addToList, removeFromList, values, errors } = props;
    const { instructions } = values;
    function validateAndAdd(e) {
        e.preventDefault();
        setDraftError(null);
        const trimmed = instructionDraft.content.trim();
        const length = trimmed.length;
        if (length < 5) return setDraftError('Minimum 5 characters per instruction')
        addToList('instructions', instructionDraft)
        setInstructionDraft({ content: '' })
    }
    function handleDraftChange(e) {
        setInstructionDraft({ content: e.target.value });
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
                value={instructionDraft.content}
                errorMsg={draftError}
                onKeyDown={e => {
                    if (e.key === "Enter") validateAndAdd(e)
                }} 
                onClick={validateAndAdd}
                onChange={handleDraftChange}
            />
        </ListDraggable>
    )
}

export default InstructionListInput;

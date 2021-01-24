import {useState, useContext} from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faGripHorizontal as faGrip} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {Button} from '../../commonStyles'
import ListInputWrapper from '../../shared/listInputWrapper'
import Input from '../../shared/input'
import { RecipeFormContext } from './recipeForm'

const KEYS = [",", "Enter"];

function InstructionListInput() {
    const [draftError, setDraftError] = useState();
    const { addToList, removeFromList, inputValues, inputErrors : errors } = useContext(RecipeFormContext);
    const { instructions, instructionDraft } = inputValues;
    function validateAndAdd(e) {
        e.preventDefault();
        setDraftError(null);
        const trimmed = instructionDraft.trim();
        const length = trimmed.length;
        if (length < 15) {
            return setDraftError('Elaborate! (minimum 15 characters)')
        } 
        addToList('instructions', ['instructionDraft'])
    }

    return (
        <ListInputWrapper
            droppableId="instructions"
            direction="column"
            listErrorMsg={errors.instructions}
        >
            <Input
                name="instructionDraft"
                label={{text: "Add Instructions"}}
                placeholder="e.g. Saute the onions in medium oil until golden brown"
                value={instructionDraft}
                errorMsg={draftError}
                onKeyDown={e => {
                    if (e.key !== "Enter" && e.key !== ",") return; 
                    validateAndAdd(e)
                }} 
                onClick={e => validateAndAdd(e)}
            />

            {instructions && instructions.length > 0 && instructions.map((instruction, i) => (
                <Draggable draggableId={instruction.id} index={i} key={instruction.id} >
                {(provided) => (
                    <ListItem 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                    >
                        <ItemBtn type="button" onClick={e => {
                                e.preventDefault();
                                removeFromList('instructions', instruction.id)
                            }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </ItemBtn>
                        <ListItemContent textalign="left">{instruction.content}</ListItemContent>
                        <ItemBtn type="button" title="drag to reorder" as="span" {...provided.dragHandleProps}>
                            <FontAwesomeIcon icon={faGrip} />
                        </ItemBtn>
                    </ListItem>
                )}
                </Draggable>
            ))}
        </ListInputWrapper>
    )
}

export default InstructionListInput;

const ListItem = styled.li`
    padding: .5rem 1rem;
    border: rgba(0,0,0,.1) 2px solid;
    border-radius: 5px;
    background-color: var(--lite-grey);
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    overflow-wrap: break-word;
`
const ListItemContent = styled.div`
    flex: auto;
    padding: .5rem 1rem;
    text-align: ${props => props.textalign || 'center'};
    line-height: 1.25;
    overflow-wrap: break-word;
    max-width: calc(100% - 128px);
`
const ItemBtn = styled(Button)`
    transform: none;
    border: none;
    width: 46px;
    :focus, :hover {
        background-color: var(--accent);
    }
    :disabled {
        background-color: var(--dark-teal);
    }
    &.margin-right {
        margin-right: 5px;
    }
`
import {useState, useRef} from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faGripHorizontal as faGrip} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {Button} from '../../commonStyles'
import ListInputWrapper from '../../shared/ListInputWrapper'
import IngredientFieldset from './IngredientFieldset'

function IngredientListInput(props) {
    const fieldsetRef = useRef(null);
    const [draftError, setDraftError] = useState();
    const { addToList, removeFromList, values, errors } = props;
    const { 
        ingredients, 
        ingredientDraft_qty, 
        ingredientDraft_unit, 
        ingredientDraft_content 
    } = values;

    function validateAndAdd(e) {
        e.preventDefault();
        setDraftError(null);
        if (!ingredientDraft_qty) return setDraftError('Quantity is required');
        if (!ingredientDraft_unit) return setDraftError('Unit is required');
        const length = ingredientDraft_content.trim().length;
        if (length < 3) {
            return setDraftError('Ingredients must be at least 3 characters')
        } 
        addToList('ingredients', ['ingredientDraft_unit','ingredientDraft_qty','ingredientDraft_content'])
        fieldsetRef.current.querySelector('input').focus() //refocus on "qty" input
    }

    console.log(ingredients)

    return (
        <ListInputWrapper 
            droppableId="ingredients"
            direction="column"
            listErrorMsg={errors.ingredients}
        >
            <IngredientFieldset 
                ref={fieldsetRef}
                values={values}
                errors={errors}
                addToList={validateAndAdd}
                draftError={draftError}
            />
            {ingredients && ingredients.length > 0 && ingredients.map((ing, i) => (
                <Draggable draggableId={ing.id} index={i} key={ing.id} >
                {(provided) => (
                    <ListItem 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                    >
                        <ItemBtn type="button" onClick={e => removeFromList('ingredients', ing.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </ItemBtn>
                        <ListItemContent>{ing.qty} {ing.unit} {ing.content}</ListItemContent>
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

export default IngredientListInput;

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
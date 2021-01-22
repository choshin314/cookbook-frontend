import {useState, useEffect} from 'react'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faChevronUp, faChevronDown, faGripHorizontal as faGrip} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { GridContainer, GridColumn, Button, media } from '../../commonStyles'
import Input from '../../shared/input'
import IngredientFieldset from './ingredientFieldset'
import ListInputWrapper from '../../shared/listInputWrapper'

function RecipeFormDetails(props) {
    const {
        step, values, errors, handleChange, setFormState, addToList, removeFromList
    } = props;
    const {instructions, ingredients} = values;

    return (
        <CSSTransition
            in={step === 2}
            appear={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <>
            <section>
                <ListInputWrapper 
                    droppableId="ingredients"
                    direction="column"
                >
                    <IngredientFieldset 
                        values={values}
                        errorMsgs={errors}
                        addToList={e => {
                            e.preventDefault()
                            addToList('ingredients', [
                                'ingredientDraft_name',
                                'ingredientDraft_qty',
                                'ingredientDraft_unit'
                            ])
                        }}
                    />
                    {ingredients && ingredients.length > 0 && ingredients.map((ing, i) => (
                        <Draggable draggableId={ing.id} index={i} key={ing.id} >
                        {(provided) => (
                            <ListItem 
                                ref={provided.innerRef} 
                                {...provided.draggableProps}
                            >
                                <ItemBtn type="button" onClick={e => {
                                        e.preventDefault();
                                        removeFromList('ingredients', ing.id)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </ItemBtn>
                                <ListItemContent>{ing.qty} {ing.unit} {ing.name}</ListItemContent>
                                <ItemBtn type="button" title="drag to reorder" as="span" {...provided.dragHandleProps}>
                                    <FontAwesomeIcon icon={faGrip} />
                                </ItemBtn>
                            </ListItem>
                        )}
                        </Draggable>
                    ))}
                </ListInputWrapper>
            </section>
            <section>
            <ListInputWrapper 
                    droppableId="instructions"
                    direction="column"
                >
                    <Input 
                        name="instructionDraft"
                        label={{text: "Instructions"}}
                        placeholder="e.g. Saute the onions for 10 min"
                        value={values.instructionDraft}
                        errorMsg={errors.instructionDraft}
                        onKeyDown={e => {
                            if (e.key === "Enter") 
                            addToList('instructions', ['instructionDraft'])
                        }}
                        onClick={e => { 
                            e.preventDefault()
                            addToList('instructions', ['instructionDraft'])
                        }}
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
            </section>
            </>
        </CSSTransition>
    )
}

export default RecipeFormDetails;

const Grid = styled(GridContainer)`
    @media(min-width: ${media.full}) {
        margin-bottom: 2rem;
    }
`
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
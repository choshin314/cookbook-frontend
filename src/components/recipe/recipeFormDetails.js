import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { GridContainer, GridColumn, Button, media } from '../commonStyles'
import Input from '../shared/input'
import ListInput from '../shared/listInput'

function RecipeFormDetails({step, values, errors, handleChange, setFormState}) {
    const {instructions} = values;

    function moveUp(e, itemToMove) {
        e.preventDefault();
        const stateArrCopy = [...instructions];
        const index = instructions.findIndex(el => el.id === itemToMove.id);

        stateArrCopy.splice(index, 1);
        stateArrCopy.splice(index - 1, 0, itemToMove);
        setFormState(prev => ({...prev, values: {...prev.values, instructions: stateArrCopy }}))
    }
    function moveDown(e, itemToMove) {
        e.preventDefault();
        const stateArrCopy = [...instructions];
        const index = instructions.findIndex(el => el.id === itemToMove.id);

        stateArrCopy.splice(index, 1);
        stateArrCopy.splice(index + 1, 0, itemToMove);
        setFormState(prev => ({...prev, values: {...prev.values, instructions: stateArrCopy }}))
    }


    return (
        <CSSTransition
            in={step === 2}
            appear={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <section>
                <ListInput 
                    name="instructionDraft" 
                    label="Instructions"
                    listItems={values.instructions} 
                    direction="column"
                    placeholder="e.g. Saute the onions for 10 min"
                    value={values.instructionDraft}
                    errorMsg={errors.instructionDraft}
                    onChange={handleChange}
                    addToList={(e, val) => {
                        e.preventDefault();
                        setFormState(prev => (
                            { ...prev, 
                                values: { 
                                    ...prev.values, 
                                    instructions: [ ...prev.values.instructions, { id: Math.random().toFixed(4) * 10000, content: val } ]
                                }
                            }
                        ));
                        setFormState(prev => ({ ...prev, values: { ...prev.values, instructionDraft: '' }}))
                    }}
                    keyDownTrigger="Enter"
                >
                    {instructions && instructions.length > 0 && instructions.map((instruction, i) => (
                        <ListItem key={instruction.id}>
                            <Btn onClick={e => {
                                    e.preventDefault();
                                    const filtered = instructions.filter(inst => inst.id !== instruction.id);
                                    setFormState(prev => ({ ...prev, values: { ...prev.values, instructions: filtered }}))
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Btn>
                            <ListItemContent>{instruction.content}</ListItemContent>
                            <BtnColumn>
                                <UpDownBtn 
                                    up={true}
                                    disabled={i === 0} 
                                    onClick={(e) => moveUp(e, instruction)}
                                >
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </UpDownBtn>
                                <UpDownBtn 
                                    disabled={i == instructions.length - 1} 
                                    onClick={(e) => moveDown(e, instruction)}
                                    
                                >
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </UpDownBtn>
                                
                            </BtnColumn>

                        </ListItem>
                    ))}
                </ListInput>

                <Fieldset name="ingredientDraft" onChange={handleChange}>
                    <Input 
                        type="number"
                        name="quantity"
                        id="quantity"
                        label={{ text: 'Qty'}}
                        min="0"
                        value={values.ingredientDraft_quantity}

                    />
                    <Input 
                        type="text"
                        name="unit"
                        id="unit"
                        label={{ text: 'Units'}}
                        value={values.ingredientDraft_unit}

                    />
                    <Input 
                        type="text"
                        name="ingName"
                        id="ingName"
                        label={{ text: 'Ingredient'}}
                        value={values.ingredientDraft_ingName}

                    />
                </Fieldset>
            </section>
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

const BtnColumn = styled.div`
    display: flex;
    flex-direction: column;

`

const ListItem = styled.li`
    padding: .5rem 1rem;
    border-radius: 5px;
    background-color: var(--lite-grey);
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ListItemContent = styled.div`

`
const Btn = styled(Button)`
    transform: none;
    border: none;
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

const UpDownBtn = styled(Btn)`
    padding: 0 5px;
    border-radius: ${props => props.up ? '5px 5px 0 0' : '0 0 5px 5px'};
`

const Fieldset = styled.fieldset`
    padding: 0;
    display: flex;
    margin-bottom: 1rem;
    border: none;

    > div {
        margin-left: .5rem;
    }

    > div:first-child {
        flex: 0 1 30%;
        max-width: 3rem;
        margin-left: 0;
        & input {
            width: 100%;
        }
    }
    > div:nth-child(2) {
        flex: 0 1 30%;
        max-width: 5rem;
        & input {
            width: 100%;
        }
    }
    > div:last-child {
        flex: auto;
        & input {
            width: 100%;
        }
    }
`
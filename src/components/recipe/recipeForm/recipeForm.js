import {useState, useEffect} from 'react'
import {uuid} from 'uuidv4'
import styled from 'styled-components'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {DragDropContext} from 'react-beautiful-dnd'

import { CardWrapper, Button, media } from '../../commonStyles'
import RecipeFormIntro from './recipeFormIntro'
import RecipeFormDetails from './recipeFormDetails'

function RecipeForm() {
    const [step, setStep] = useState(1);
    const [tags, setTags] = useState([]);
    const [formState, setFormState] = useState({
        values: {
            title: "",
            introText: "",
            prepTime: "",
            cookTime: "",
            servings: "",
            instructionDraft: "",
            instructions: [],
            ingredientDraft_name: "",
            ingredientDraft_qty: "",
            ingredientDraft_unit: "",
            ingredients: []
        },
        errors: {
        }
    });

    useEffect(() => window.scrollTo(0,0), [step])

    function handleChange(e) {
        let {name, value, type, files} = e.target;
        if (type === "file") {
            setFormState({ ...formState, values: { ...formState.values, [name]: files[0] }});
            return;
        }
        if (type === "number") {
            value = parseFloat(value);
        }
        setFormState({ ...formState, values: { ...formState.values, [name]: value } });
    }

    function handleFieldsetChange(e) {
        let {name, value, type} = e.target;
        const fieldset_field = `${e.currentTarget.name}_${name}`
        setFormState({...formState, values: {...formState.values, [fieldset_field]: value }})
    }

    function addToList(listKey, draftKeys) {
        const newListItem = { id: uuid() };
        if (draftKeys.length > 1) {
            draftKeys.forEach(key => {
                //ex. - instructionDraft_qty, instructionDraft_unit 
                //map to newListItem as qty & unit
                let keynameTail = key.split('_')[1]
                newListItem[keynameTail] = formState.values[key];
            })
        } else {
            newListItem.content = formState.values[draftKeys[0]];
        }
        const clearedDrafts = {};
        draftKeys.forEach(draftKey => clearedDrafts[draftKey] = '')

        setFormState({
            ...formState, 
            values: {
                ...formState.values, 
                ...clearedDrafts,
                [listKey]: [...formState.values[listKey], newListItem],
            }
        })
    }

    function removeFromList(listKey, listItemId) {
        const currentList = formState.values[listKey];
        const filtered = currentList.filter(el => el.id !== listItemId);
        setFormState(prev => ({ ...prev, values: { ...prev.values, [listKey]: filtered }}))
    }

    function handleDragEnd(result) {
        const {source, destination} = result;
        if (!destination) return; 
        //disallow dragging items to other lists
        if (source.droppableId !== destination.droppableId) return; 
        if (    //if no delta, return
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return; 

        const newItems = [...formState.values[source.droppableId]];
        const draggedItem = newItems[source.index];
        newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, draggedItem);
        setFormState(prev => ({...prev, values: {...prev.values, [source.droppableId]: newItems}}));
    }
    console.log(formState)
    return (
        <Card>
            <DragDropContext onDragEnd={handleDragEnd} >
            <Form onChange={handleChange}>
                {step === 1 && (
                    <>
                    <RecipeFormIntro 
                        step={step}
                        values={formState.values} 
                        errors={formState.errors} 
                        handleChange
                        tags={tags}
                        setTags={setTags}
                    />
                    <FormBtn type="button"className="align-right" 
                        onClick={(e) => {
                            e.preventDefault();
                            setStep(2);
                        }} 
                    >
                        <span>Add Instructions</span>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </FormBtn>
                    </>
                )}
                {step === 2 && (
                    <>
                    <RecipeFormDetails
                        step={step}
                        values={formState.values}
                        errors={formState.errors}
                        handleChange={handleChange}
                        setFormState={setFormState}
                        addToList={addToList}
                        removeFromList={removeFromList}
                    />
                    <FormBtn type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setStep(1);
                        }} 
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <span>Back to Intro</span>
                    </FormBtn>
                    </>
                )}
            </Form>
            </DragDropContext>
        </Card>
    )
}

export default RecipeForm;

const Card = styled(CardWrapper)`
    margin: 1rem 0;
    :hover::before {
        opacity: 0;
    }
`

const Form = styled.form`
    background-color: #fff;
    border-radius: 5px;
    padding: 1rem;
    position: relative;
    @media(min-width: ${media.medium}) {
        padding: 2rem;
    }
    display: flex;
    flex-direction: column;
    
`

const FormBtn = styled(Button)`
    flex-grow: 0;
    align-self: start;
    span {
        margin: 0 0 0 .5rem;
    }
    &.align-right {
        align-self: flex-end;
        span {
            margin: 0 .5rem 0 0;
        }
    }
`

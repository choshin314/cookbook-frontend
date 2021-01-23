import {useState, useEffect, useReducer} from 'react'
import {uuid} from 'uuidv4'
import styled from 'styled-components'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {DragDropContext} from 'react-beautiful-dnd'

import {useForm} from '../../../hooks/form'
import { CardWrapper, Button, media } from '../../commonStyles'
import RecipeFormIntro from './recipeFormIntro'
import RecipeFormDetails from './recipeFormDetails'

const initValues = {
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
    ingredients: [],
    tagDraft: "",
    tags: []
}

function validateForm(vals) {
    const errors = {};
    const requiredFields = [
        'title', 'introText', 'prepTime', 'cookTime', 'servings'
    ]
    const minMaxChars = { title: [8, 50], introText: [50, 400] };
    const minMaxItems = { instructions: [5, 30], ingredients: [3, 30] };

    for (let required of requiredFields) {
        if (!vals[required]) errors[required] = "*Required"
    };
    for (let field in minMaxChars) {
        if (vals[field].length < field[0]) {
            errors[field] = `*Requires at least ${field[0]} characters`
        } else if (vals[field].length > field[1]) {
            errors[field] = `*Maximum of ${field[1]} characters`
        }
    };
    for (let list in minMaxItems) {
        if (vals[list].length < list[0]) {
            errors[list] = `*Add at least ${list[0]} ${list}`
        } else if (vals[list].length > list[1]) {
            errors[list] = `*Too many ${list} (maximum of ${list[1]})`
        }
    };
    return Object.keys(errors).length > 0 ?  errors : null;
} 

function RecipeForm() {
    const [step, setStep] = useState(1);
    const {
        inputVals, 
        inputErrors, 
        setInputVals,
        handleChange, 
        addToList, 
        removeFromList, 
        validateAndSubmit
    } = useForm(initValues, handleSubmit, validateForm);

    async function handleSubmit() {

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

        const newItems = [...inputVals[source.droppableId]];
        const draggedItem = newItems[source.index];
        newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, draggedItem);
        setInputVals(prev => ({...prev, [source.droppableId]: newItems}));
    }

    useEffect(() => window.scrollTo(0,0), [step])
    console.log(inputVals)

    return (
        <Card>
            <DragDropContext onDragEnd={handleDragEnd} >
            <Form onChange={handleChange}>
                {step === 1 && (
                    <>
                    <RecipeFormIntro 
                        step={step}
                        values={inputVals} 
                        errors={inputErrors} 
                        handleChange={handleChange}
                        addToList={addToList}
                        removeFromList={removeFromList}
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
                        values={inputVals}
                        errors={inputErrors}
                        handleChange={handleChange}
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

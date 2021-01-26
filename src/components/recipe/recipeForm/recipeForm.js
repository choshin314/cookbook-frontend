import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {DragDropContext} from 'react-beautiful-dnd'

import {useForm} from '../../../hooks/form'
import { CardWrapper, Button, media } from '../../commonStyles'
import RecipeFormIntro from './recipeFormIntro'
import RecipeFormDetails from './recipeFormDetails'

export const RecipeFormContext = React.createContext();
const constraints = {
    title: {
        required: true,
        minChars: 5,
        maxChars: 50
    },
    introText: {
        required: true,
        minChars: 50,
        maxChars: 400
    },
    servings: {
        required: true
    },
    prepTime: {
        required: true
    },
    cookTime: {
        required: true
    },
    coverImg: {
        required: true,
        size: 5120,
        type: ["image/jpeg", "image/jpg", "image/png"]
    },
    instructions: {
        required: true,
        minItems: 4,
        maxItems: 30
    },
    ingredients: {
        required: true,
        minItems: 3,
        maxItems: 30
    },
    tags: null,
    tagDraft: null,
    instructionDraft: null,
    ingredientDraft_qty: null,
    ingredientDraft_unit: null,
    ingredientDraft_name: null

}

function RecipeForm({ initValues, handleSubmit }) {
    const [step, setStep] = useState(1);
    const {
        inputValues, 
        inputErrors, 
        handleChange, 
        handleDragEnd,
        addToList, 
        removeFromList, 
        validateAndSubmit
    } = useForm(initValues, constraints, handleSubmit, 'recipeForm', 'coverImg' );

    useEffect(() => window.scrollTo(0,0), [step])
    console.log(inputValues)

    return (
        <Card>
            <RecipeFormContext.Provider value={{
                inputValues, inputErrors, addToList, removeFromList
            }}>
            
            
            <Form onChange={handleChange} onSubmit={validateAndSubmit}>
                {step === 1 && (
                    <>
                    <RecipeFormIntro step={step} />
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
                    <DragDropContext onDragEnd={handleDragEnd} >
                    <RecipeFormDetails step={step} />
                    <FormBtn type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setStep(1);
                        }} 
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <span>Back to Intro</span>
                    </FormBtn>
                    </DragDropContext>
                )}
                <button type="submit" >submit</button>
            </Form>
            
            
            </RecipeFormContext.Provider>
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

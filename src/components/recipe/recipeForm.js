import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { CardWrapper, Button, media } from '../commonStyles'
import RecipeFormIntro from './recipeFormIntro'
import RecipeFormDetails from './recipeFormDetails'

function RecipeForm() {
    const [step, setStep] = useState(1);
    const [tags, setTags] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [formState, setFormState] = useState({
        values: {
            title: "",
            introText: "",
            prepTime: "",
            cookTime: "",
            servings: "",
            instructionDraft: "",
            instructions: []
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

    console.log(formState);

    return (
        <Card>
            <Form>
                {step === 1 && (
                    <>
                    <RecipeFormIntro 
                        step={step}
                        values={formState.values} 
                        errors={formState.errors} 
                        handleChange={handleChange} 
                        tags={tags}
                        setTags={setTags}
                    />
                    <FormBtn className="align-right" 
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
                    />
                    <FormBtn
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

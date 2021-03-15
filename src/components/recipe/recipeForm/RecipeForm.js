import styled from 'styled-components'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {DragDropContext} from 'react-beautiful-dnd'

import { CardWrapper, Button, media } from '../../commonStyles'
import RecipeFormIntro from './RecipeFormIntro'
import RecipeFormDetails from './RecipeFormDetails'
import Spinner from '../../shared/Spinner'
import FormFeedback from '../../shared/FormFeedback'

function RecipeForm(props) {
    const { 
        step,
        addToList,
        changeStep,
        inputValues,
        inputErrors,
        formErrors,
        handleChange,
        handleDragEnd,
        removeFromList,
        validateAndSubmit,
        isSubmitting
    } = props;

    return (
        <Card>
            <Form onChange={handleChange} onSubmit={validateAndSubmit}>
                {step === 1 && (
                    <>
                    {isSubmitting && <Spinner />}
                    <RecipeFormIntro 
                        step={step} 
                        values={inputValues} 
                        errors={inputErrors}
                        addToList={addToList}
                        removeFromList={removeFromList}
                    />
                    <FormBtn type="button" className="align-right" 
                        onClick={(e) => {
                            e.preventDefault();
                            changeStep();
                        }} 
                    >
                        <span>Add Instructions</span>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </FormBtn>
                    </>
                )}
                {step === 2 && (
                    <DragDropContext onDragEnd={handleDragEnd} >
                    {isSubmitting && <Spinner />}
                    <RecipeFormDetails 
                        step={step} 
                        values={inputValues} 
                        errors={inputErrors}
                        addToList={addToList}
                        removeFromList={removeFromList}
                    />
                    <ButtonDiv>
                        <FormBtn type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                changeStep();
                            }} 
                        >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                            <span>Back to Intro</span>
                        </FormBtn>
                        <SubmitBtn 
                            className="align-right" 
                            type="submit" 
                        >
                            Create Recipe
                        </SubmitBtn>
                    </ButtonDiv>
                    </DragDropContext>
                )}
            </Form>
            <FormFeedback formErrors={formErrors} />
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
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
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
const SubmitBtn = styled(FormBtn)`
    background-color: var(--accent);
`

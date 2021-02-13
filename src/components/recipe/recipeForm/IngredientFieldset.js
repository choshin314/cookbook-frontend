import React from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import Input from '../../shared/Input'
import FormFeedback from '../../shared/FormFeedback'
import {Button} from '../../commonStyles'
import AddBtn from '../../shared/AddBtn'

const IngredientFieldset = React.forwardRef((props, ref) => {
    const {values, draftError, errors, addToList, onChange} = props;
    return (
        <Container>
            <Label htmlFor="ingredientDraftSet">Add Ingredients</Label>
            <Fieldset 
                ref={ref}
                id="ingredientDraftSet" 
                name="ingredientDraftSet" 
                onKeyDown={e => {
                    if (e.key === "Enter") addToList(e);
                }}
            >
                <Input 
                    type="number"
                    name="qty"
                    label={{ text: 'Qty'}}
                    min="0"
                    value={values.qty}
                    errorMsg={''}
                    autoFocus={true}
                    onChange={onChange}
                />
                <Input 
                    type="text"
                    name="unit"
                    label={{ text: 'Units'}}
                    value={values.unit}
                    errorMsg={''}
                    onChange={onChange}
                />
                <Input 
                    type="text"
                    name="content"
                    label={{ text: 'Ingredient'}}
                    value={values.content}
                    errorMsg={''}
                    onClick={addToList}
                    onChange={onChange}
                />
                
            </Fieldset>
            <FormFeedback 
                errorMsg={draftError}
            />
        </Container>
    )
})

export default IngredientFieldset

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`
const Label = styled.label`
    font-weight: 500;
    margin-top: .5rem;
    margin-bottom: .5rem;
`

const Fieldset = styled.fieldset`
    padding: 0;
    display: flex;
    width: 100%;
    border: none;
    position: relative;

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
    > div:nth-child(3) {
        flex: auto;
        & input {
            width: 100%;
        }
    }
`


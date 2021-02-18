import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'


import {Main} from '../../commonStyles'
import RecipeForm from './RecipeForm.js'
import { ajax } from '../../../helpers/sendAjax'
import { setRedirect } from '../../../redux/actions/redirectActions'
import { setFlash } from '../../../redux/actions/flashActions'
import useForm from '../../../hooks/form'
import { RECIPE_CONSTRAINTS } from '../../../constants'

const initValues = {
    title: '',
    intro: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    coverImg: '',
    instructions: [],
    ingredients: [],
    tags: []
}

function RecipeCreateForm({ auth, setRedirect, setFlash }) {
    const [step, setStep] = useState(1);
    const {
        addToList,
        inputValues, 
        inputErrors, 
        handleChange, 
        handleDragEnd, 
        removeFromList, 
        validateAndSubmit,
        isSubmitting
    } = useForm(initValues, RECIPE_CONSTRAINTS, handleSubmit, 'recipeForm', 'coverImg' );

    async function handleSubmit(values, setFormErrors, setSubmitting) {
        const result = await ajax.postMulti('/recipes', values, ['coverImg'], auth.accessToken)
        if (result.error) {
            setSubmitting(prev => !prev)
            return setFlash('error', result.error);
        }
        if (result.data) {
            setSubmitting(prev => !prev)
            setRedirect(`/recipes/view/${result.data.id}-${result.data.slug}`);
            setFlash('success', 'Recipe created, yay!');
        }
    }

    useEffect(() => window.scrollTo(0,0), [step])

    return (
        <Main>
            <RecipeForm 
                step={step}
                addToList={addToList}
                changeStep={() => step === 1 ? setStep(2) : setStep(1)}
                inputValues={inputValues}
                inputErrors={inputErrors}
                handleChange={handleChange}
                handleDragEnd={handleDragEnd}
                removeFromList={removeFromList}
                validateAndSubmit={validateAndSubmit}
                isSubmitting={isSubmitting}
            />
        </Main>
    )
}
const mapStateToProps = (global) => ({ auth: global.auth });
const mapDispatchToProps = { setRedirect: setRedirect, setFlash: setFlash }

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreateForm)
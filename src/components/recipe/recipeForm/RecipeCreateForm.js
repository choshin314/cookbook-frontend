import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'


import {Main} from '../../commonStyles'
import RecipeForm from './RecipeForm.js'
import { setRedirect } from '../../../redux/actions/redirectActions'
import { setFlash } from '../../../redux/actions/flashActions'
import { checkAndHandleAuthErr } from '../../../redux/actions/authActions'
import useForm from '../../../hooks/form'
import { RECIPE_CONSTRAINTS } from '../../../constants'
import { ajax } from '../../../helpers/sendAjax'

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

function RecipeCreateForm({ auth, dispatchSetRedirect, dispatchSetFlash, dispatchHandleErr }) {
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
    } = useForm(initValues, RECIPE_CONSTRAINTS, handleSubmit);

    async function handleSubmit(values) {
        const result = await ajax.postMulti('/recipes', values, ['coverImg'])
        if (result.error) {
            dispatchHandleErr(result, 'Must be logged in to create recipe')
        } else if (result.data) {
            dispatchSetRedirect(`/recipes/view/${result.data.id}-${result.data.slug}`);
            dispatchSetFlash('success', 'Recipe created, yay!');
        }
        return result;
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
const mapDispatchToProps = { 
    dispatchSetRedirect: setRedirect, 
    dispatchSetFlash: setFlash,
    dispatchHandleErr: checkAndHandleAuthErr 
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreateForm)
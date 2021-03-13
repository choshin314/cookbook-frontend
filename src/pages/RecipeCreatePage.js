import { useState, useEffect } from 'react'
import {connect} from 'react-redux'

import { setRedirect } from '../redux/actions/redirectActions'
import { setFlash } from '../redux/actions/flashActions'
import { checkAndHandleAuthErr } from '../redux/actions/authActions'
import { ajax } from '../helpers/sendAjax'
import { RECIPE_CONSTRAINTS } from '../constants'
import {Main} from '../components/commonStyles'
import RecipeForm from '../components/recipe/recipeForm/RecipeForm.js'
import useForm from '../hooks/form'
import HelmetHead from '../components/shared/HelmetHead'

function RecipeCreatePage(props) {
    const [step, setStep] = useState(1);
    const { 
        auth, 
        dispatchSetRedirect, 
        dispatchSetFlash, 
        dispatchHandleErr 
    } = props;
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
            <HelmetHead title="Create Recipe" />
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreatePage)

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

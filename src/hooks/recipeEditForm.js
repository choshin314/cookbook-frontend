import { useDispatch } from 'react-redux'

import { useForm } from './form'
import { ajax } from '../helpers/sendAjax'
import { RECIPE_CONSTRAINTS } from '../constants/recipeConstraints'
import { setFlash } from '../redux/actions/flashActions'
import { getLocalStorage } from '../helpers/index'

export function useRecipeEditForm(fields, recipe, imgFieldName) {
    const dispatch = useDispatch();
    const token = getLocalStorage('accessToken');
    const initValues = {};
    fields.forEach(field => initValues[field] = recipe[field]);

    const handleSubmit = async (inputValues, setFormErrors, setIsSubmitting) => {
        if(!token) return dispatch(setFlash('error','Login required'));
        let result= imgFieldName ?
            await ajax.patchMulti(`/recipes/${recipe.id}`, inputValues, [imgFieldName], token) :
            await ajax.patch(`/recipes/${recipe.id}`, inputValues, token)
        if (result.error) return dispatch(setFlash('error', result.error));
        if (result.data) console.log(result.data);             
    }

    const {
        handleChange, validateAndSubmit, inputValues, inputErrors
    } = useForm(initValues, RECIPE_CONSTRAINTS, handleSubmit, null, imgFieldName)

    return {
        handleChange, validateAndSubmit, inputValues, inputErrors
    }
}
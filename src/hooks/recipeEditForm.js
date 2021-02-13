import { useDispatch } from 'react-redux'

import { useForm } from './form'
import { ajax } from '../helpers/sendAjax'
import { RECIPE_CONSTRAINTS } from '../constants/recipeConstraints'
import { setFlash } from '../redux/actions/flashActions'
import { getLocalStorage } from '../helpers/index'
import useRecipeViewContext from './recipeViewContextHook'

export function useRecipeEditForm(fields, imgFieldName, endpath) {
    const dispatch = useDispatch();
    const { recipe, updateRecipe } = useRecipeViewContext();
    const initValues = {};
    fields.forEach(field => initValues[field] = recipe[field]);
    const token = getLocalStorage('auth').accessToken;

    const handleSubmit = async (inputValues, setFormErrors, setIsSubmitting) => {
        if(!token) return dispatch(setFlash('error','Login required'));
        let result;
        if (imgFieldName) {
            result = await ajax.patchMulti(`/recipes/${recipe.id}/${endpath}`, inputValues, [imgFieldName], token)
        } else {
            result = await ajax.patch(`/recipes/${recipe.id}/${endpath}`, inputValues, token)
        }
        if (result.error) return dispatch(setFlash('error', result.error));
        if (result.data) console.log(result.data);             
    }

    return useForm(initValues, RECIPE_CONSTRAINTS, handleSubmit, null, imgFieldName)
}
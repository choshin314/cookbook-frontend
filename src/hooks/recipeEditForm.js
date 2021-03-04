import { useDispatch, useSelector } from 'react-redux'

import useForm from './form'
import { ajax } from '../helpers/sendAjax'
import { RECIPE_CONSTRAINTS } from '../constants/recipeConstraints'
import { setFlash } from '../redux/actions/flashActions'
import useRecipeViewContext from './recipeViewContextHook'

export default function useRecipeEditForm(fields, endpath, imgFieldName=null) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.accessToken)
    const { recipe, updateRecipe } = useRecipeViewContext();
    const { patch, patchMulti } = ajax;
    const initValues = {};
    fields.forEach(field => initValues[field] = recipe[field]);

    const handleSubmit = async (inputValues) => {
        if(!token) return dispatch(setFlash('error','Login required'));
        let result;
        if (imgFieldName) {
            result = await patchMulti(`/recipes/${recipe.id}/${endpath}`, inputValues, [imgFieldName])
        } else {
            result = await patch(`/recipes/${recipe.id}/${endpath}`, inputValues)
        }
        if (result.error) {
            dispatch(setFlash('error', result.error))
        } else {
            dispatch(setFlash('success', 'Recipe was updated'));
            updateRecipe(result.data);
        }
        return result;           
    }

    return useForm(initValues, RECIPE_CONSTRAINTS, handleSubmit, null, imgFieldName)
}
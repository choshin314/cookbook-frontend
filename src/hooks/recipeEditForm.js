import { useDispatch } from 'react-redux'

import useForm from './form'
import useAjax from './ajax'
import { RECIPE_CONSTRAINTS } from '../constants/recipeConstraints'
import { setFlash } from '../redux/actions/flashActions'
import { getLocalStorage } from '../helpers/index'
import useRecipeViewContext from './recipeViewContextHook'

export default function useRecipeEditForm(fields, endpath, imgFieldName=null) {
    const dispatch = useDispatch();
    const { recipe, updateRecipe } = useRecipeViewContext();
    const { patch, patchMulti } = useAjax(`/recipes/${recipe.id}/${endpath}`)
    const initValues = {};
    fields.forEach(field => initValues[field] = recipe[field]);
    const token = getLocalStorage('auth').accessToken;

    const handleSubmit = async (inputValues) => {
        if(!token) return dispatch(setFlash('error','Login required'));
        let result;
        if (imgFieldName) {
            result = await patchMulti(inputValues, [imgFieldName])
        } else {
            result = await patch(inputValues)
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
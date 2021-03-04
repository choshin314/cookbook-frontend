import { useDispatch, useSelector } from 'react-redux'

import useForm from './form'
import { ajax } from '../helpers/sendAjax'
import { ACCOUNT_CONSTRAINTS } from '../constants'
import { setFlash } from '../redux/actions/flashActions'
import { getLocalStorage } from '../helpers/index'
import useRecipeViewContext from './recipeViewContextHook'
import { updateUserDetails } from '../redux/actions/authActions'

export default function useAccountEditForm(initValues, endpath) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { patch, patchMulti } = ajax;

    const handleSubmit = async (inputValues) => {
        let result;
        if (endpath === "profile-pic") {
            result = await patchMulti(`/users/account/${endpath}`, inputValues, ['profilePic'])
        } else {
            result = await patch(`/users/account/${endpath}`, inputValues)
        }
        if (result.error) {
            dispatch(setFlash('error', result.error))
        } else {
            if (endpath === "general" || endpath === "profile-pic") {
                dispatch(updateUserDetails(result.data))
            }
            dispatch(setFlash('success', 'Updated account'));   
        }
        return result;      
    }

    return useForm(initValues, ACCOUNT_CONSTRAINTS, handleSubmit, null, 'profilePic')
}
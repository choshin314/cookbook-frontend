import { useDispatch } from 'react-redux'

import useForm from './form'
import { ajax } from '../helpers/sendAjax'
import { ACCOUNT_CONSTRAINTS } from '../constants'
import { setFlash } from '../redux/actions/flashActions'
import { checkAndHandleAuthErr, updateUserDetails } from '../redux/actions/authActions'

export default function useAccountEditForm(initValues, endpath) {
    const dispatch = useDispatch();
    const { patch, patchMulti } = ajax;

    const handleSubmit = async (inputValues) => {
        let result;
        if (endpath === "profile-pic") {
            result = await patchMulti(`/account/${endpath}`, inputValues, ['profilePic'])
        } else {
            result = await patch(`/account/${endpath}`, inputValues)
        }
        if (result.error) dispatch(checkAndHandleAuthErr(result, 'Login required to edit account'))
        if (result.data) {
            if (endpath === "general" || endpath === "profile-pic") {
                dispatch(updateUserDetails(result.data)) 
            }
            dispatch(setFlash('success', 'Updated account'));   
        }
        return result;      
    }

    return useForm(initValues, ACCOUNT_CONSTRAINTS, handleSubmit)
}
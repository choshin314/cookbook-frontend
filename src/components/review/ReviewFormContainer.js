import { connect } from "react-redux"
import { useParams } from "react-router-dom"

import { ajax } from '../../helpers/sendAjax'
import { REVIEW_CONSTRAINTS } from "../../constants"
import useForm from "../../hooks/form"
import { Button } from '../commonStyles'
import ReviewForm from "./ReviewForm"
import useToggle from '../../hooks/toggle'
import ModalForm from '../shared/ModalForm'
import { setFlash } from "../../redux/actions/flashActions"
import { checkAndHandleAuthErr } from "../../redux/actions/authActions"
import useRecipeViewContext from "../../hooks/recipeViewContextHook"

function ReviewFormContainer({auth, dispatchSetFlash, dispatchHandleErr }) {
    const { id: recipeId } = useParams();
    const [ formOpen, toggleFormOpen ] = useToggle(false);
    const { recipe, updateRecipe } = useRecipeViewContext();
    const { postMulti } = ajax;

    const handleSubmit = async (values) => {
        const valuesAndID = { ...values, recipeId: parseInt(recipeId) };
        const result = await postMulti('/reviews', valuesAndID, ['reviewImg']);
        if (result.error) {
            dispatchHandleErr(result, 'Login required')
        } else if (result.data) {
            updateRecipe(result.data); //receives updated list of reviews for recipe
            dispatchSetFlash('success', 'Thanks for your review!')
        }
        return result;
    }

    const handleFormOpen = () => {
        auth.user ?
            toggleFormOpen() :
            dispatchSetFlash('info', 'Login required to write review')
    }

    const {
        inputValues,
        inputErrors,
        formErrors,
        handleChange,
        validateAndSubmit,
        isSubmitting,
        resetForm 
    } = useForm(initValues(), REVIEW_CONSTRAINTS, handleSubmit, 'reviewForm', 'reviewImg');
    
    return (
        <>
            <Button type="button" onClick={handleFormOpen}>Write a review</Button>
            {formOpen && (
                <ModalForm 
                    open={formOpen} 
                    toggleOpen={toggleFormOpen} 
                    onChange={handleChange} 
                    onSubmit={validateAndSubmit}
                    resetForm={resetForm}
                >
                    <ReviewForm 
                        values={inputValues}
                        errors={inputErrors}
                    />
                </ModalForm>
            )}
        </>
    )
}

const mapState = (state) => ({ auth: state.auth })
const mapDispatch = { dispatchSetFlash: setFlash, dispatchHandleErr: checkAndHandleAuthErr }
export default connect(mapState, mapDispatch)(ReviewFormContainer)

function initValues() {
    return {
        headline: '',
        content: '',
        rating: '',
        reviewImg: ''
    }
}
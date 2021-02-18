import { connect } from "react-redux"
import { useParams } from "react-router-dom"

import { REVIEW_CONSTRAINTS } from "../../constants"
import useForm from "../../hooks/form"
import { Button } from '../commonStyles'
import ReviewForm from "./ReviewForm"
import useToggle from '../../hooks/toggle'
import ModalForm from '../shared/ModalForm'
import { ajax } from "../../helpers/sendAjax"
import { setFlash } from "../../redux/actions/flashActions"
import useRecipeViewContext from "../../hooks/recipeViewContextHook"

function ReviewFormContainer({auth, dispatchSetFlash}) {
    const { id: recipeId } = useParams();
    const [ formOpen, toggleFormOpen ] = useToggle(false);
    const { recipe, updateRecipe } = useRecipeViewContext();

    const handleSubmit = async (values, setFormErrors, setIsSubmitting) => {
        const valuesAndID = { ...values, recipeId: parseInt(recipeId) };
        const result = await ajax.postMulti('/reviews', valuesAndID, ['reviewImg'], auth.accessToken);
        if (result.error) {
            return result.error === "Not authorized" ? 
                dispatchSetFlash('error', 'Login required to write review') :
                dispatchSetFlash('error', result.error);
        }
        updateRecipe(result.data); //receives updated list of reviews for recipe
        setIsSubmitting(prev => false);
        dispatchSetFlash('success', 'Thanks for your review!')
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
            <Button type="button" onClick={toggleFormOpen}>Write a review</Button>
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
const mapDispatch = { dispatchSetFlash: setFlash }
export default connect(mapState, mapDispatch)(ReviewFormContainer)

function initValues() {
    return {
        headline: '',
        content: '',
        rating: '',
        reviewImg: ''
    }
}
import { connect } from 'react-redux';

import useForm from '../../hooks/form'
import { ajax } from '../../helpers/sendAjax'
import { REVIEW_CONSTRAINTS } from '../../constants/reviewConstraints';
import { setFlash } from '../../redux/actions/flashActions';
import { checkAndHandleAuthErr } from '../../redux/actions/authActions';
import useRecipeViewContext from '../../hooks/recipeViewContextHook';
import EditWrapper from '../shared/EditWrapper';
import ReviewForm from './ReviewForm';

function EditReview({ review, user, dispatchSetFlash, dispatchHandleErr }) {
    const { setRecipe } = useRecipeViewContext(); 
    const { patchMulti } = ajax;
    const initVals = {
        reviewImg: null,
        headline: review.headline, 
        content: review.content,
        rating: review.rating
    }
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm 
    } = useForm(initVals, REVIEW_CONSTRAINTS, handleSubmit, 'reviewEdit', 'reviewImg')

    async function handleSubmit(inputValues) {
        const result = await patchMulti(`/reviews/${review.id}`, inputValues, ['reviewImg']);
        const successfulEdits = result.data;
        if (result.error) {
            dispatchHandleErr(result, 'Must be logged in to edit review');
        } else {
            setRecipe(recipe => ({
                ...recipe,
                reviews: recipe.reviews.map(rev => {
                    if (rev.id === review.id) return { ...rev, ...successfulEdits };
                    return rev;
                })
            }))
            dispatchSetFlash('success', 'Your review has been updated!')
        }
        return result;
    }

    if (!user || user.id !== review.userId) return null;

    return (
        <EditWrapper 
            onChange={handleChange} 
            onSubmit={validateAndSubmit} 
            resetForm={resetForm}
        >
            <ReviewForm 
                values={inputValues}
                errors={inputErrors}
            />
        </EditWrapper>
    )
}
const mapState = state => ({ user: state.auth.user })
const mapDispatch = { dispatchSetFlash: setFlash, dispatchHandleErr: checkAndHandleAuthErr }
export default connect(mapState, mapDispatch)(EditReview)
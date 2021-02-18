import { connect } from 'react-redux';
import { REVIEW_CONSTRAINTS } from '../../constants/reviewConstraints';
import useAjax from '../../hooks/ajax'
import { useForm } from '../../hooks/form'
import useRecipeViewContext from '../../hooks/recipeViewContextHook';
import { setFlash } from '../../redux/actions/flashActions';
import EditWrapper from '../shared/EditWrapper';
import Input from "../shared/Input";
import ImgInput from '../shared/ImgInput';
import ReviewForm from './ReviewForm';
import { EditBtnWrapper } from '../recipe/recipeEdit/EditBtnWrapper';

function EditReview({ review, user, dispatchSetFlash }) {
    const { setRecipe } = useRecipeViewContext(); 
    const { patchMulti } = useAjax(`/reviews/${review.id}`);
    const initVals = {
        reviewImg: null,
        headline: review.headline, 
        content: review.content,
        rating: review.rating
    }
    const { 
        handleChange, validateAndSubmit, inputValues, inputErrors, resetForm 
    } = useForm(initVals, REVIEW_CONSTRAINTS, handleSubmit, 'reviewEdit', 'reviewImg')

    async function handleSubmit(inputValues, setFormErrors, setIsSubmitting) {
        const result = await patchMulti(inputValues, ['reviewImg']);
        const successfulEdits = result.data;
        if (result.error) {
            setIsSubmitting(false);
            return dispatchSetFlash('error', result.error);
        }
        setRecipe(recipe => ({
            ...recipe,
            reviews: recipe.reviews.map(rev => {
                if (rev.id === review.id) return { ...rev, ...successfulEdits };
                return rev;
            })
        }))
        setIsSubmitting(false);
        dispatchSetFlash('success', 'Your review has been updated!')
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
const mapDispatch = { dispatchSetFlash: setFlash }
export default connect(mapState, mapDispatch)(EditReview)
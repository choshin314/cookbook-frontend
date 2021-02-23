import { connect } from 'react-redux';

import useAjax from '../../hooks/ajax'
import { setFlash } from '../../redux/actions/flashActions';
import useRecipeViewContext from '../../hooks/recipeViewContextHook';
import DeleteBtn from '../shared/DeleteBtn';

function DeleteReview({ review, user, dispatchSetFlash }) {
    const { setRecipe } = useRecipeViewContext(); 
    const { deleteAjax } = useAjax();

    async function handleDelete() {
        const result = await deleteAjax(`/reviews/${review.id}`)
        if (result.error) return dispatchSetFlash('error', result.error);
        setRecipe(recipe => ({
            ...recipe,
            reviews: recipe.reviews.filter(r => r.id !== result.data.id )
        }))
        dispatchSetFlash('success', 'Your review has been deleted')
    }

    if (!user || user.id !== review.userId) return null;

    return (
        <DeleteBtn onClick={handleDelete} />
    )
}
const mapState = state => ({ user: state.auth.user })
const mapDispatch = { dispatchSetFlash: setFlash }
export default connect(mapState, mapDispatch)(DeleteReview)
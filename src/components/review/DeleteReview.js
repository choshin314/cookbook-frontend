import { connect } from 'react-redux';

import { deleteAjax } from '../../helpers/sendAjax'
import { setFlash } from '../../redux/actions/flashActions';
import { checkAndHandleAuthErr } from '../../redux/actions/authActions';
import useRecipeViewContext from '../../hooks/recipeViewContextHook';
import DeleteBtn from '../shared/DeleteBtn';

function DeleteReview({ review, user, dispatchSetFlash, dispatchHandleErr }) {
    const { setRecipe } = useRecipeViewContext(); 

    async function handleDelete() {
        const result = await deleteAjax(`/reviews/${review.id}`)
        if (result.error) return dispatchHandleErr(result, 'Must be logged in to delete review');
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
const mapDispatch = { dispatchSetFlash: setFlash, dispatchHandleErr: checkAndHandleAuthErr }
export default connect(mapState, mapDispatch)(DeleteReview)
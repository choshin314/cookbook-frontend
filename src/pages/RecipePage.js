import { useEffect, useState } from 'react'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

import { setFlash } from '../redux/actions/flashActions'
import { setRedirect } from '../redux/actions/redirectActions'
import useRecipeViewContext from '../hooks/recipeViewContextHook'
import { ajax } from '../helpers/sendAjax'
import RecipeView from '../components/recipe/RecipeView'
import Spinner from '../components/shared/Spinner'
import HelmetHead from '../components/shared/HelmetHead';

function RecipePage({ user, dispatchSetFlash, dispatchSetRedirect }) {
    const { recipe, updateRecipe, checkRecipeOwner } = useRecipeViewContext();
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams();
    const history = useHistory();

    async function handleDelete() {
        const result = await ajax.delete(`/recipes/${recipe.id}`)
        if (result.error) return dispatchSetFlash('error', result.error);
        history.push('/profile/me')
        dispatchSetFlash('success', 'Your recipe has been deleted')
    }

    useEffect(() => {
        setLoading(true);
        ajax.get(`/recipes/${params.id}`)
            .then(result => {
                if(result.error) {
                    setError(result.error);
                    dispatchSetFlash("Could not find that recipe :(");
                } else if (result.data) {
                    updateRecipe(result.data);
                    checkRecipeOwner(result.data);
                };
                setLoading(prev => !prev);
            })
    }, [dispatchSetFlash, updateRecipe, checkRecipeOwner, params.id])

    if (loading) return <Spinner />
    if (error) return <Redirect to="/" />
    return (
        <>
            <HelmetHead title={recipe.title} />
            <RecipeView onDelete={handleDelete} />
        </>
    )
}

const mapState = state => ({ user: state.auth.user })
const mapDispatch = { dispatchSetFlash: setFlash, dispatchSetRedirect: setRedirect }
export default connect(mapState, mapDispatch)(RecipePage)


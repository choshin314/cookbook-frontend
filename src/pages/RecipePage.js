import { useEffect, useState, createContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { connect } from 'react-redux';

import { setFlash } from '../redux/actions/flashActions'
import { setRedirect } from '../redux/actions/redirectActions'
import { RecipeViewProvider } from '../context/recipeViewContext'
import useRecipeViewContext from '../hooks/recipeViewContextHook'
import { ajax } from '../helpers/sendAjax'
import RecipeView from '../components/recipe/RecipeView'
import Spinner from '../components/shared/Spinner'
import HelmetHead from '../components/shared/HelmetHead';

function RecipePage({user, dispatchSetFlash, dispatchSetRedirect }) {
    const { recipe, updateRecipe, setIsOwnedByUser } = useRecipeViewContext();
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams();

    async function handleDelete() {
        const result = await ajax.delete(`/recipes/${recipe.id}`)
        if (result.error) return dispatchSetFlash('error', result.error);
        dispatchSetRedirect('/profile/me')
        dispatchSetFlash('success', 'Your recipe has been deleted')
    }

    useEffect(() => {
        setLoading(true);
        ajax.get(`/recipes/${params.id}`)
            .then(result => {
                if(result.error) {
                    setError(result.error);
                    dispatchSetFlash("Could not find that recipe :(");
                };
                if(result.data) {
                    updateRecipe(result.data);
                    if (user && user.id === result.data.user.id) {
                        setIsOwnedByUser(true)
                    } else {
                        setIsOwnedByUser(false)
                    };
                };
                setLoading(prev => !prev);
            })
    }, [])

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


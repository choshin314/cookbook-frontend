import { useEffect, useState, createContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { RecipeViewProvider } from '../context/recipeViewContext'
import useRecipeViewContext from '../hooks/recipeViewContextHook'
import { ajax } from '../helpers/sendAjax'
import RecipeView from '../components/recipe/RecipeView'
import { connect } from 'react-redux';
import { setFlash } from '../redux/actions/flashActions'
import Spinner from '../components/shared/Spinner'

function RecipePage({user, dispatchSetFlash}) {
    const { recipe, updateRecipe, setIsOwnedByUser } = useRecipeViewContext();
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams();

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
    return <RecipeView />
}

const mapState = state => ({ user: state.auth.user })
const mapDispatch = { dispatchSetFlash: setFlash }
export default connect(mapState, mapDispatch)(RecipePage)


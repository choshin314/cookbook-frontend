import { useEffect, useState, createContext } from 'react'
import { useParams } from 'react-router-dom'

import { RecipeViewProvider } from '../context/recipeViewContext'
import useRecipeViewContext from '../hooks/recipeViewContextHook'
import { ajax } from '../helpers/sendAjax'
import RecipeView from '../components/recipe/RecipeView'
import { connect } from 'react-redux';

function RecipePage({user}) {
    const { recipe, updateRecipe, setIsOwnedByUser } = useRecipeViewContext();
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams();

    useEffect(() => {
        setLoading(true);
        ajax.get(`/recipes/${params.id}`)
            .then(result => {
                if(result.error) setError(result.error);
                if(result.data) {
                    updateRecipe(result.data);
                    if (user && user.id === result.data.user.id) setIsOwnedByUser(true);
                };
                setLoading(prev => !prev);
            })
    }, [])

    if (loading) return <div>Loading</div>
    return <RecipeView />
}

const mapState = state => ({ user: state.auth.user })

export default connect(mapState)(RecipePage)


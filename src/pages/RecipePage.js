import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ajax } from '../helpers/sendAjax'
import RecipeView from '../components/recipe/RecipeView'

function RecipePage() {
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        setLoading(true);
        ajax.get(`/recipes/${params.id}`)
            .then(result => {
                if(result.error) setError(result.error);
                if(result.data) setRecipe(result.data);
                setLoading(prev => !prev);
            })
    }, [])

    console.log(recipe)

    if (loading) return <div>Loading</div>
    return <RecipeView recipe={recipe} />
}

export default RecipePage


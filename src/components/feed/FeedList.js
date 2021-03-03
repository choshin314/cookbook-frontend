import styled from 'styled-components'

import RecipeCard from '../recipe/RecipeCard'
import Spinner from '../shared/Spinner'

function FeedList(props) {
    const {
        loading,
        recipes,
        newerRecipesCount,
        showNewerRecipes,
        getOlderRecipes,
        endOfList
    } = props;

    return (
        <StyledList>
            {loading && <Spinner />}
            {newerRecipesCount > 0 && <button onClick={showNewerRecipes}>{newerRecipesCount} New Recipes</button>}
            {recipes.map(r => <li key={r.id}><RecipeCard recipe={r} /></li>)}
            {!endOfList && <button onClick={getOlderRecipes}>Get More</button> }
        </StyledList>
    )
}

export default FeedList

const StyledList = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        margin-bottom: .5rem;
    }
`
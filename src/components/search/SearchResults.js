import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Ratings from '../recipe/Ratings'
import UserList from '../shared/UserList'
import RecipeList from './RecipeList'

function SearchResults({ category, users, recipes }) {

    if (category === 'all') return (
        <>
            <Results height="50%">
                <h2>User Results</h2>
                {users.length === 0 && <NoResults>Search returned no results</NoResults>}
                {users.length > 0 && <UserList users={users} />}
            </Results>
            <Results height="50%">
                <h2>Recipe Results</h2>
                {recipes.length === 0 && <NoResults>Search returned no results</NoResults>}
                {recipes.length > 0 && <RecipeList recipes={recipes} />}
            </Results>
        </>
    )
    if (category === 'people') return (
        <Results height="100%">
            <h2>User Results</h2>
            {users.length === 0 && <NoResults>Search returned no results</NoResults>}
            {users.length > 0 && <UserList users={users} />}
        </Results>
    )
    if (category === 'recipes') return (
        <Results height="100%">
            <h2>Recipe Results</h2>
            {recipes.length === 0 && <NoResults>Search returned no results</NoResults>}
            {recipes.length > 0 && <RecipeList recipes={recipes} />}
        </Results>
    )
    return <Redirect to="/" />
}

export default SearchResults

const Results = styled.div`
    background-color: white;
    border: black 1px solid;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 1rem;
    min-height: 200px;
    height: ${p => `calc(${p.height} - 60px)`};
    position: relative;
    overflow-y: auto;
    h2 {
        margin-bottom: 1rem;
    }
    &:last-child {
        margin-bottom: 0;
    }
`
const NoResults = styled.div`
    color: var(--med-lite-grey);
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
`

import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Ratings from '../recipe/Ratings'
import UserList from '../shared/UserList'
import Spinner from '../shared/Spinner'
import RecipeList from './RecipeList'
import SeeMoreBtn from './SeeMoreBtn'

function SearchResults({ users, recipes, queries }) {

    if (users && recipes) return (
        <>
            <Results height="50%">
                <h2>User Results</h2>
                {users.loading && <Spinner />}
                {users.results.length === 0 && <NoResults>Search returned no results</NoResults>}
                {users.results.length > 0 && <UserList users={users.results} />}
                {!users.endOfList && <SeeMoreBtn category="users" query={queries.q} filter={queries.filter} />}
            </Results>
            <Results height="50%">
                <h2>Recipe Results</h2>
                {recipes.loading && <Spinner />}
                {recipes.results.length === 0 && <NoResults>Search returned no results</NoResults>}
                {recipes.results.length > 0 && <RecipeList recipes={recipes.results} />}
                {!recipes.endOfList && <SeeMoreBtn category="recipes" query={queries.q} filter={queries.filter} />}
            </Results>
        </>
    )
    if (users && !recipes) return (
        <Results height="100%">
            <h2>User Results</h2>
            {users.loading && <Spinner />}
            {users.results.length === 0 && <NoResults>Search returned no results</NoResults>}
            {users.results.length > 0 && <UserList users={users.results} />}
            {!users.endOfList && <SeeMoreBtn category="users" query={queries.q} filter={queries.filter} />}
        </Results>
    )
    if (recipes && !users) return (
        <Results height="100%">
            <h2>Recipe Results</h2>
            {recipes.loading && <Spinner />}
            {recipes.results.length === 0 && <NoResults>Search returned no results</NoResults>}
            {recipes.results.length > 0 && <RecipeList recipes={recipes.results} />}
            {!recipes.endOfList && <SeeMoreBtn category="recipes" query={queries.q} filter={queries.filter} />}
        </Results>
    )
    return <Redirect to="/" />
}

export default SearchResults

const Results = styled.div`
    background-color: white;
    border: rgba(0,0,0,.3) 2px solid;
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

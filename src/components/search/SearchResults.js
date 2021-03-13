import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Ratings from '../recipe/Ratings'
import UserList from '../shared/UserList'
import Spinner from '../shared/Spinner'
import RecipeList from './RecipeList'
import SeeMoreBtn from './SeeMoreBtn'
import BottomObserver from '../shared/BottomObserver'

function SearchResults({ users, recipes, queries, fetchMoreResults }) {

    if (users && recipes) return (
        <>
            <Results maxHeight="50%">
                <h2>User Results</h2>
                {users.loading && <Spinner />}
                {users.results.length === 0 && <NoResults>Search returned no results</NoResults>}
                {users.results.length > 0 && <UserList users={users.results} />}
                {!users.endOfResults && <SeeMoreBtn category="users" query={queries.q} filter={queries.filter || 'all'} />}
            </Results>
            <Results maxHeight="50%">
                <h2>Recipe Results</h2>
                {recipes.loading && <Spinner />}
                {recipes.results.length === 0 && <NoResults>Search returned no results</NoResults>}
                {recipes.results.length > 0 && <RecipeList recipes={recipes.results} />}
                {!recipes.endOfResults && <SeeMoreBtn category="recipes" query={queries.q} filter={queries.filter || 'all'} />}
            </Results>
        </>
    )
    if (users && !recipes) return (
        <Results maxHeight="100%">
            <h2>User Results</h2>
            {users.loading && <Spinner />}
            {users.results.length === 0 && <NoResults>Search returned no results</NoResults>}
            {users.results.length > 0 && (
                <UserList 
                    users={users.results} 
                    observer={<BottomObserver 
                        onIntersect={fetchMoreResults} 
                        loading={users.loading}
                        endOfList={users.endOfResults} 
                    />}
                />
            )}
        </Results>
    )
    if (recipes && !users) return (
        <Results maxHeight="100%">
            <h2>Recipe Results</h2>
            {recipes.loading && <Spinner />}
            {recipes.results.length === 0 && <NoResults>Search returned no results</NoResults>}
            {recipes.results.length > 0 && (
                <RecipeList 
                    recipes={recipes.results} 
                    observer={<BottomObserver 
                        onIntersect={fetchMoreResults} 
                        loading={recipes.loading} 
                        endOfList={recipes.endOfResults}
                    />}
                />
            )}
        </Results>
    )
    return <Redirect to="/" />
}

export default SearchResults

const Results = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    
    background-color: white;
    border: rgba(0,0,0,.3) 2px solid;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 1rem;
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
    font-size: .75rem;
    font-weight: 500;
    text-align: center;
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 200px;
`

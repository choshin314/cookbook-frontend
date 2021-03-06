import { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import queryString from 'query-string'
import { useLocation } from "react-router-dom"

import SearchResults from '../components/search/SearchResults'
import { Main } from "../components/commonStyles"
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { getSearchResults, resetSearch } from '../redux/actions/searchActions'
import FilterMenu from '../components/search/FilterMenu'
import HelmetHead from '../components/shared/HelmetHead'

function SearchPage({ dispatchGetSearchResults, dispatchResetResults, searchState }) {
    const match = useRouteMatch();
    const { search, pathname } = useLocation();
    const queries = queryString.parse(search);
    const { users, recipes } = searchState;

    useEffect(() => {
        dispatchResetResults();
        if (pathname === '/search/all') {
            dispatchGetSearchResults('recipes', queries.q)
            dispatchGetSearchResults('users', queries.q)
        }
        if (pathname === '/search/people') {
            dispatchGetSearchResults('users', queries.q, queries.filter)
        }
        if (pathname === '/search/recipes') {
            dispatchGetSearchResults('recipes', queries.q, queries.filter)
        }
    }, [pathname, queries.q, queries.filter, dispatchGetSearchResults, dispatchResetResults])

    const userCallback = useCallback(() => {
        dispatchGetSearchResults('users', queries.q, queries.filter)
    }, [queries.q, queries.filter, dispatchGetSearchResults])

    const recipeCallback = useCallback(() => {
        dispatchGetSearchResults('recipes', queries.q, queries.filter)
    }, [queries.q, queries.filter, dispatchGetSearchResults])

    if (match.isExact) return <Redirect to="/" />
    return (
        <Main>
            <HelmetHead title="Search Results" />
            <Container>
                <FilterMenu queries={queries} />
                <Switch>
                    <Route path={`${match.path}/all`}>
                        <SearchResults 
                            users={users} 
                            recipes={recipes} 
                            queries={queries}
                        />
                    </Route>
                    <Route path={`${match.path}/people`}>
                        <SearchResults 
                            users={users} 
                            queries={queries}
                            fetchMoreResults={userCallback}
                        />
                    </Route>
                    <Route path={`${match.path}/recipes`}>
                        <SearchResults 
                            recipes={recipes} 
                            queries={queries}
                            fetchMoreResults={recipeCallback}
                        />
                    </Route>
                </Switch>
            </Container>
        </Main>
    )
}

const mapState = state => ({ searchState: state.search })
const mapDispatch = { dispatchGetSearchResults: getSearchResults, dispatchResetResults: resetSearch }
export default connect(mapState, mapDispatch)(SearchPage)

const Container = styled.div`
    background-color: var(--lite-grey);
    padding: 1rem;
    height: 100%;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
`